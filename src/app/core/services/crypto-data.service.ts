import { Injectable, signal, computed, effect } from '@angular/core';
import { interval } from 'rxjs';

export interface CryptoPrice {
  id: string;
  name: string;
  price: number;
  changePercent: number;
  previousPrice?: number;
}

export interface CryptoStats {
  movingAverage: number;
  volatility: number;
}

export interface PriceAlert {
  cryptoId: string;
  threshold: number;
  type: 'above' | 'below';
}

@Injectable({ providedIn: 'root' })
export class CryptoDataService {
  // PRECIOS REALES según exchanges - Actualizado Febrero 2026
  // Fuente: Binance
  private cryptos: CryptoPrice[] = [
    { id: 'btc', name: 'Bitcoin', price: 71394.52, changePercent: 0 },
    { id: 'eth', name: 'Ethereum', price: 2123.10, changePercent: 0 },
    { id: 'sol', name: 'Solana', price: 88.44, changePercent: 0 },
    { id: 'bnb', name: 'Binance Coin', price: 642.29, changePercent: 0 },
    { id: 'dot', name: 'Polkadot', price: 1.37, changePercent: 0 },
    { id: 'ada', name: 'Cardano', price: 0.27, changePercent: 0 },
    { id: 'xrp', name: 'Ripple', price: 1.48, changePercent: 0 },
    { id: 'ltc', name: 'Litecoin', price: 55.45, changePercent: 0 },
    { id: 'doge', name: 'Dogecoin', price: 0.09, changePercent: 0 },
    { id: 'avax', name: 'Avalanche', price: 9.25, changePercent: 0 }
  ];

  // Signals
  public rawPrices = signal<CryptoPrice[]>(this.cryptos);
  public priceAlerts = signal<PriceAlert[]>([]);
  public cryptoStats = signal<Map<string, CryptoStats>>(new Map());

  // Computed signals
  public totalMarketCap = computed(() => {
    const prices = this.rawPrices();
    return prices.reduce((sum, crypto) => sum + crypto.price, 0);
  });

  public activePairs = computed(() => this.rawPrices().length);

  public averageVolatility = computed(() => {
    const stats = this.cryptoStats();
    if (stats.size === 0) return 0;

    let totalVolatility = 0;
    stats.forEach(stat => totalVolatility += stat.volatility);
    return totalVolatility / stats.size;
  });

  public topGainers = computed(() => {
    return this.rawPrices()
      .filter(p => p.changePercent > 0)
      .sort((a, b) => b.changePercent - a.changePercent);
  });

  public topLosers = computed(() => {
    return this.rawPrices()
      .filter(p => p.changePercent < 0)
      .sort((a, b) => a.changePercent - b.changePercent);
  });

  // Web Worker
  private worker?: Worker;
  private priceHistory: Map<string, number[]> = new Map();

  constructor() {
    this.initializeWorker();
    this.startPriceUpdates();
    this.setupAlertMonitoring();
  }

  private initializeWorker(): void {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../../shared/workers/stats.worker.ts', import.meta.url), {
        type: 'module'
      });

      this.worker.onmessage = ({ data }) => {
        const { cryptoId, movingAverage, volatility } = data;
        const currentStats = new Map(this.cryptoStats());
        currentStats.set(cryptoId, { movingAverage, volatility });
        this.cryptoStats.set(currentStats);
      };
    }
  }

  private startPriceUpdates(): void {
    interval(200).subscribe(() => {
      this.updatePrices();
    });
  }

  private updatePrices(): void {
    this.rawPrices.update(current =>
      current.map(crypto => {
        const previousPrice = crypto.price;

        // Variación realista: ±0.15% por actualización (200ms)
        // Esto simula volatilidad real de mercado
        const changePercent = (Math.random() - 0.5) * 0.3; // -0.15% a +0.15%
        const change = crypto.price * (changePercent / 100);
        const newPrice = crypto.price + change;

        // Actualizar historial de precios
        const history = this.priceHistory.get(crypto.id) || [];
        history.push(newPrice);
        if (history.length > 20) history.shift(); // Mantener solo los últimos 20 valores
        this.priceHistory.set(crypto.id, history);

        // Enviar al Web Worker para cálculos
        if (this.worker && history.length >= 5) {
          this.worker.postMessage({
            cryptoId: crypto.id,
            prices: history.map(price => ({ price }))
          });
        }

        return {
          ...crypto,
          previousPrice,
          price: newPrice,
          changePercent
        };
      })
    );
  }

  private setupAlertMonitoring(): void {
    effect(() => {
      const prices = this.rawPrices();
      const alerts = this.priceAlerts();

      prices.forEach(crypto => {
        alerts.forEach(alert => {
          if (alert.cryptoId === crypto.id) {
            if (alert.type === 'above' && crypto.price > alert.threshold) {
              this.triggerAlert(crypto, alert);
            } else if (alert.type === 'below' && crypto.price < alert.threshold) {
              this.triggerAlert(crypto, alert);
            }
          }
        });
      });
    });
  }

  private triggerAlert(crypto: CryptoPrice, alert: PriceAlert): void {
    console.log(`🚨 ALERT: ${crypto.name} is ${alert.type} ${alert.threshold}`);
  }

  public addAlert(alert: PriceAlert): void {
    this.priceAlerts.update(alerts => [...alerts, alert]);
  }

  public removeAlert(cryptoId: string): void {
    this.priceAlerts.update(alerts =>
      alerts.filter(alert => alert.cryptoId !== cryptoId)
    );
  }

  public getPriceHistory(cryptoId: string): number[] {
    return this.priceHistory.get(cryptoId) || [];
  }
}
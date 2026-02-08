import { Component, input, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightChangeDirective } from '../../shared/directives/highlight-change.directive';
import { CryptoPrice, CryptoDataService } from '../../core/services/crypto-data.service';

@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightChangeDirective],
  templateUrl: './crypto-card.component.html',
  styleUrl: './crypto-card.component.scss'
})
export class CryptoCardComponent {
  crypto = input.required<CryptoPrice>();

  private dataService = inject(CryptoDataService);

  // Signals para alertas
  alertEnabled = signal(false);
  alertThreshold = signal<number | null>(null);
  alertType = signal<'above' | 'below'>('above');

  // Computed signal para determinar si la alerta está activa
  isAlertTriggered = computed(() => {
    if (!this.alertEnabled() || this.alertThreshold() === null) {
      return false;
    }

    const crypto = this.crypto();
    const threshold = this.alertThreshold()!;
    const type = this.alertType();

    return type === 'above'
      ? crypto.price > threshold
      : crypto.price < threshold;
  });

  // Obtener estadísticas del servicio
  stats = computed(() => {
    const cryptoStats = this.dataService.cryptoStats();
    return cryptoStats.get(this.crypto().id);
  });

  // Obtener historial de precios para el gráfico
  priceHistory = computed(() => {
    return this.dataService.getPriceHistory(this.crypto().id);
  });

  // Generar puntos SVG para el gráfico - CORREGIDO
  chartPath = computed(() => {
    const history = this.priceHistory();
    if (history.length < 2) return '';

    const width = 200;
    const height = 60;
    const padding = 5;

    const minPrice = Math.min(...history);
    const maxPrice = Math.max(...history);
    const priceRange = maxPrice - minPrice || 1;

    const points = history.map((price, index) => {
      const x = padding + (index / (history.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    });

    // Generar el path SVG correctamente
    let path = `M ${points[0]}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i]}`;
    }

    return path;
  });

  constructor() {
    // Efecto para actualizar alertas en el servicio
    effect(() => {
      const crypto = this.crypto();
      if (this.alertEnabled() && this.alertThreshold() !== null) {
        this.dataService.addAlert({
          cryptoId: crypto.id,
          threshold: this.alertThreshold()!,
          type: this.alertType()
        });
      } else {
        this.dataService.removeAlert(crypto.id);
      }
    });
  }

  toggleAlert(): void {
    this.alertEnabled.update(v => !v);
    if (this.alertEnabled() && this.alertThreshold() === null) {
      this.alertThreshold.set(this.crypto().price);
    }
  }

  updateAlertThreshold(value: string): void {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      this.alertThreshold.set(numValue);
    }
  }

  setAlertType(type: 'above' | 'below'): void {
    this.alertType.set(type);
  }
}
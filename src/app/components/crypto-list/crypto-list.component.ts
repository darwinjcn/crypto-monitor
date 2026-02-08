import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoDataService, CryptoPrice } from '../../core/services/crypto-data.service';
import { CryptoCardComponent } from '../crypto-card/crypto-card.component';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CommonModule, CryptoCardComponent],
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoListComponent {
  private dataService = inject(CryptoDataService);
  
  cryptos = this.dataService.rawPrices;
  totalMarketCap = this.dataService.totalMarketCap;
  activePairs = this.dataService.activePairs;
  averageVolatility = this.dataService.averageVolatility;

  // TrackBy function para optimizar el renderizado
  trackByCryptoId(index: number, crypto: CryptoPrice): string {
    return crypto.id;
  }
}

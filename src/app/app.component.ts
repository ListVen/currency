import { forkJoin, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rate$: Observable<{usd: number, eur: number}>;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.rate$ = forkJoin({
      usd: this.currencyService.getExchangeRate('USD', 'UAH'),
      eur: this.currencyService.getExchangeRate('EUR', 'UAH')
    });
  }
}

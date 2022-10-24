import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../../services/currency.service';

type Currency = 'UAH' | 'USD' | 'EUR';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <section>
      <h2>From:</h2>
      <mat-form-field>
        <mat-select
          [(ngModel)]="fromCurrency"
          (ngModelChange)="recalculateTo()"
          name="fromCurrency"
        >
          <mat-option *ngFor="let code of currencies" [value]="code">
            {{ code }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <input
          matInput
          [(ngModel)]="fromAmount"
          (ngModelChange)="recalculateTo()"
          name="fromAmount"
          type="text"
        />
      </mat-form-field>
    </section>

    <section>
      <h2>To:</h2>
      <mat-form-field>
        <mat-select
          [(ngModel)]="toCurrency"
          (ngModelChange)="recalculateFrom()"
          name="toCurrency"
        >
          <mat-option *ngFor="let code of currencies" [value]="code">
            {{ code }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <input
          matInput
          [(ngModel)]="toAmount"
          (ngModelChange)="recalculateFrom()"
          name="toAmount"
          type="text"
        />
      </mat-form-field>
    </section>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      h2 { color: white; }
      input { color: white; }

      section {
        padding: 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class ConverterComponent {
  fromCurrency: Currency = 'UAH';
  fromAmount = 1;

  toCurrency: Currency = 'UAH';
  toAmount = 1;

  readonly currencies: Currency[] = ['UAH', 'USD', 'EUR'];

  constructor(private currencyService: CurrencyService) {}

  recalculateFrom() {
    this.currencyService.getExchangeRate(
      this.toCurrency,
      this.fromCurrency,
      this.toAmount
    )
    .subscribe(amount => this.fromAmount = +amount);
  }

  recalculateTo() {
    this.currencyService.getExchangeRate(
      this.fromCurrency,
      this.toCurrency,
      this.fromAmount
    )
    .subscribe(amount => this.toAmount = +amount);
  }
}

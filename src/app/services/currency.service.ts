import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_KEY = '6FdI4jTn3gCtd3gip7u0SmuNH2lg1TpM'

type Result = {
  result: number
}

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getExchangeRate(from: string, to: string, amount = 1): Observable<number> {
    return this.http.get<Result>(
      `https://api.apilayer.com/exchangerates_data/convert?` +
        `from=${from}&to=${to}&amount=${amount}`,
      {
        headers: {apikey: API_KEY}
      }
    ).pipe(map(({result}) => +result.toFixed(2)));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }
  
  getAllCurrencies(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
  }
  getGraphData(currency: string, currencyId: string, days: string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${currencyId}/market_chart?vs_currency=${currency}&days=${days}`);
  }
  getCurrencyId(currencyId: string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${currencyId}`);
  }
}

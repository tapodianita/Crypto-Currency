import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedCurrencyService {

  private selectedCurrency$ : BehaviorSubject<string> = new BehaviorSubject<string>("HUF");
  constructor() { }

  getCurrency(){
    return this.selectedCurrency$.asObservable();
  }
  setCurrency(currency : string){
    this.selectedCurrency$.next(currency);
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedCurrencyService } from './services/selected-currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentCurrency : string ="HUF"

  constructor(private selected: SelectedCurrencyService, private router: Router){

  }
  selectedCurrency(event:string){
    this.selected.setCurrency(event);
  }
  navigateHome(){
    this.router.navigate(['currency-table']);
  }
}

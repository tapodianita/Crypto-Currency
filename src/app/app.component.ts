import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentCurrency : string ="HUF"

  constructor(){

  }
  selectedCurrency(event:string){
    console.log(event)
  }
}

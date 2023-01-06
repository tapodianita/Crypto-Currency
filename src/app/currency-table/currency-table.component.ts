import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { SelectedCurrencyService } from '../services/selected-currency.service';
@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.scss']
})
export class CurrencyTableComponent {
  constructor(private api : CurrencyService, private router : Router, private selected: SelectedCurrencyService){}

  currency : string = "HUF"
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  showFirstLastButtons = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void{
  this.getAllData();
  this.selected.getCurrency()
  .subscribe(res=>{
    this.currency = res;
    this.getAllData();
  })
  }

  getAllData() {
    this.api.getAllCurrencies(this.currency)
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
  searchCoins(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotoDetails(row: any) {
    this.router.navigate(['currency-graph',row.id])
  }

  isNegative(val: number):boolean{
    if(val <=0){
      return true;
    }
    else{
      return false;
    }
  }
}

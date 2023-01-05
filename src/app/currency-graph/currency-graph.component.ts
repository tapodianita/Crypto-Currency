import { CurrencyService } from '../services/currency.service';
import { SelectedCurrencyService } from '../services/selected-currency.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-currency-graph',
  templateUrl: './currency-graph.component.html',
  styleUrls: ['./currency-graph.component.scss']
})
export class CurrencyGraphComponent {
  coinData : any;
  currencyId !: string;
  days : number = 30;
  currency : string = "HUF";

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: '#360568',
        borderColor: '#360568',
        pointBackgroundColor: '#A5E6BA',
        pointBorderColor: '#A5E6BA',
        pointHoverBackgroundColor: '#A5E6BA',
        pointHoverBorderColor: '#A5E6BA',
      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api: CurrencyService, private activatedRoute: ActivatedRoute, private selected: SelectedCurrencyService){}

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(
      res=> {
        this.currencyId = res['id'];
      }
    );
    this.getAllData();
    this.getGraphData(this.days);
    this.selected.getCurrency()
    .subscribe(res => {
      this.currency = res;
      this.getGraphData(this.days);
      this.getAllData();
    })
  }

  getAllData(){
    this.api.getCurrencyId(this.currencyId)
    .subscribe(res=>{
      if(this.currency === "USD"){
        res.market_data.current_price.huf = res.market_data.current_price.usd;
        res.market_data.market_cap.huf = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.huf = res.market_data.current_price.huf;
      res.market_data.market_cap.huf = res.market_data.market_cap.huf;
      this.coinData = res;
    })
  }
  getGraphData(days:number){
    this.days = days
    this.api.getCurrencyGraphData(this.currency, this.currencyId,this.days)
    .subscribe(res=>{
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 100);
      this.lineChartData.datasets[0].data = res.prices.map((
        a:any)=>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    })
  }
}

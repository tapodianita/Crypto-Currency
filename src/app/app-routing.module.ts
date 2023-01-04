import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyGraphComponent } from './currency-graph/currency-graph.component';
import { CurrencyTableComponent } from './currency-table/currency-table.component';

const routes: Routes = [
  {path:'', redirectTo: 'currency-table', pathMatch: 'full'},
  {path:'currency-table', component:CurrencyTableComponent},
  {path:'currency-graph/:id', component:CurrencyGraphComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

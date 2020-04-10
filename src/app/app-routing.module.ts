import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreChartsComponent } from './more-charts/more-charts.component';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  {
    path: 'more-charts',
    component: MoreChartsComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: '',
    redirectTo:'/more-charts',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

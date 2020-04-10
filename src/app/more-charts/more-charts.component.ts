import { Component, OnInit } from "@angular/core";
import { GetDataService } from "../get-data.service";
import { Chart } from "chart.js";
import { element } from 'protractor';
import { Router, Data } from '@angular/router';

//For tabluar informations
export interface DataTable{
  state: string;
  totalCount: string;
  recoveredCount: string;
  deathCount: string;
}
export interface DataTable2{
  State: string;
  Confirmed: string;
  Active: string;
  Recovered: string;
  Deaths: string;
}
@Component({
  selector: "app-more-charts",
  templateUrl: "./more-charts.component.html",
  styleUrls: ["./more-charts.component.scss"],
})
export class MoreChartsComponent implements OnInit {

  chart=[]
  constructor(private _data: GetDataService, private router: Router) {}
  result: any; //result from googlesheets
  displayedColumns:string[]=['State', 'Confirmed', 'Active', 'Recovered', 'Deaths'] // for tablur data
  dataSource:DataTable2[]=[]; //for tabular data
  dataSource2:DataTable2[]=[]; //for tabular data
  

  ngOnInit() {
    this._data.getData().subscribe((res) => {
      this.result = this.csvToArray(res);
      // console.log('88888888888888888888888')
       console.log(this.result);

       // initialse chart data
       this.displayTotalPieChart();
       this.displayStateBarChart();
    let states=[]
    this.result.forEach(element=>states.push(element.State))
    
    console.log(states)

    let confirmed=[]
    this.result.forEach(element=>confirmed.push(element.Confirmed))
    
  
    let active=[]
    this.result.forEach(element=>active.push(element.Active))

    let deaths=[]
    this.result.forEach(element=>deaths.push(element.Deaths))
  

    let recovered=[]
    this.result.forEach(element=>recovered.push(element.Recovered))
  
    for(var i=0;i<states.length;i++)
       this.dataSource.push({State: states[i],Confirmed: confirmed[i],Active: active[i],Recovered: recovered[i], Deaths: deaths[i]})
   
      this.dataSource2=this.dataSource
       console.log("this is data")
       console.log(this.dataSource2)
      // this.chart=new Chart('canvas',{
      //   type: 'pie',
      //   data:{
      //     labels:['Active cases', 'Deaths', 'Recovered'],
      //     datasets: [{
      //       label:'# of Patients',
      //       data:[this.result[0].Active, this.result[0].Deaths, this.result[0].Recovered],
      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(255, 206, 86, 0.2)'
      //       ],
      //       borderColor: [
      //         'rgba(255, 99, 132, 1)',
      //         'rgba(54, 162, 235, 1)',
      //         'rgba(255, 206, 86, 1)'
      //       ],
      //       borderWidth: 1
      //     }]
      //   }
      // })





    });

 

  }

  ngAfterViewInit(){
    this.displayTotalPieChart();
    this.displayStateBarChart();
  }

  csvToArray(csvString) {
    var lines = csvString.split("\n");
    var headerValues = lines[0].split(",");
    var dataValues = lines.splice(1).map(function (dataLine) {
      return dataLine.split(",");
    });
    return dataValues.map(function (rowValues) {
      var row = {};
      headerValues.forEach(function (headerValue, index) {
        row[headerValue] = index < rowValues.length ? rowValues[index] : null;
      });
      return row;
    });
  }



  //Total Cases Pie chart
  displayTotalPieChart(){


    this.chart[0]=new Chart('canvasTotalPie',{
      type: 'pie',
      data:{
        labels:['Active cases', 'Deaths', 'Recovered'],
        datasets: [{
          label:'# of Patients',
          data:[this.result[0].Active, this.result[0].Deaths, this.result[0].Recovered],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1.2)',
            'rgba(54, 162, 235, 1.2)',
            'rgba(255, 206, 86, 1.2)'
          ],
          borderWidth: 2
        }]
      },
      options:{
        title:{
          display:true,
          text: "All india status"
        }
      }
    })

  }



  //State bar chart
  displayStateBarChart(){


    let states=[]
    this.result.forEach(element=>states.push(element.State))
    states.shift() // remove 1st element i.e. Total cases

    let confirmed=[]
    this.result.forEach(element=>confirmed.push(element.Confirmed))
    confirmed.shift()

    let deaths=[]
    this.result.forEach(element=>deaths.push(element.Deaths))
    deaths.shift()

    let recovered=[]
    this.result.forEach(element=>recovered.push(element.Recovered))
    recovered.shift()

    this.chart[1]=new Chart('canvasStateBarChart',{
      type: 'horizontalBar',
      data:{
        labels:states,
        datasets: [
          {
            label: "Confirmed Cases",
            backgroundColor: "#3e95cd",
            data: confirmed
          },
          {
            label: "Recovered ",
            backgroundColor: "#8e5ea2",
            data: recovered
          },
          {
            label: "Deaths ",
            backgroundColor: "#ff0000",
            data: deaths
          }
        ]
      },
      options:{
        title:{
          display:true,
          text: "Statewise data"
        },
        
        scales:{
          yAxis:[{
            barPercentage: 0.5,
            categoryPercentage: 0.5
          }]
        }
      }
    })

  }

  logChange(index){
    if(index==1)
    this.displayTotalPieChart();
    else if(index==2)
    this.displayStateBarChart();
    else if(index==3)
    this.router.navigate(['charts']);
  }

}

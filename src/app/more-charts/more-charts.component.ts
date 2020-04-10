import { Component, OnInit } from "@angular/core";
import { GetDataService } from "../get-data.service";
import { Chart } from "chart.js";
import { element } from 'protractor';
@Component({
  selector: "app-more-charts",
  templateUrl: "./more-charts.component.html",
  styleUrls: ["./more-charts.component.scss"],
})
export class MoreChartsComponent implements OnInit {

  chart=[]
  constructor(private _data: GetDataService) {}
  result: any;
  ngOnInit() {
    this._data.getData().subscribe((res) => {
      this.result = this.csvToArray(res);
      // console.log('88888888888888888888888')
       console.log(this.result);

       this.displayTotalPieChart();
       this.displayStateBarChart();

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
        }}
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
        }
      }
    })

  }

}

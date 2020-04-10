import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import {Chart } from 'chart.js';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {


  chartLinks: any =["https://docs.google.com/spreadsheets/d/e/2PACX-1vRdfmyZJaHWzwBA5RSmwKqyCKAHQgn2qVAeGaM2U3JUq1aEO-I5pAqINNRB3D4fe4e48T6GZxrYn-7w/pubchart?oid=256750270&amp;format=interactive",
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdfmyZJaHWzwBA5RSmwKqyCKAHQgn2qVAeGaM2U3JUq1aEO-I5pAqINNRB3D4fe4e48T6GZxrYn-7w/pubchart?oid=547615245&amp;format=interactive",
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdfmyZJaHWzwBA5RSmwKqyCKAHQgn2qVAeGaM2U3JUq1aEO-I5pAqINNRB3D4fe4e48T6GZxrYn-7w/pubchart?oid=1630971566&amp;format=interactive",
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdfmyZJaHWzwBA5RSmwKqyCKAHQgn2qVAeGaM2U3JUq1aEO-I5pAqINNRB3D4fe4e48T6GZxrYn-7w/pubchart?oid=1042166760&amp;format=interactive",
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdfmyZJaHWzwBA5RSmwKqyCKAHQgn2qVAeGaM2U3JUq1aEO-I5pAqINNRB3D4fe4e48T6GZxrYn-7w/pubchart?oid=1094328597&amp;format=interactive",
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdfmyZJaHWzwBA5RSmwKqyCKAHQgn2qVAeGaM2U3JUq1aEO-I5pAqINNRB3D4fe4e48T6GZxrYn-7w/pubchart?oid=1950088878&amp;format=interactive"

]

  constructor() { }

  ngOnInit() {
  }

}

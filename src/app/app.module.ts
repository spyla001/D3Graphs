import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { PiechartComponent } from './piechart/piechart.component';
import { SunBurstComponent } from './sun-burst/sun-burst.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DatastroeService} from './datastroe.service';

@NgModule({
  declarations: [
    AppComponent,
    BarGraphComponent,
    PiechartComponent,
    SunBurstComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule
  ],
  providers: [DatastroeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

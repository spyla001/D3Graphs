import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import {Item} from '../item.interface';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  @Input() data: Item[];

  svgDims = {
    width: 900,
    height: 900
  };

  margin = {
    top: 2,
    right: 20,
    bottom: 70,
    left: 70
  };

graphWidth = this.svgDims.width - this.margin.left - this.margin.right;
graphHeight = this.svgDims.height - this.margin.top - this.margin.bottom;



  constructor() { }

  ngOnInit() {
    this.createBar(this.data);
  }




  createBar(data) {
    const svg = d3.select('body').append('svg')
      .attr('width', this.svgDims.width)
      .attr('height', this.svgDims.height);
    const graph = svg.append('g')
      .attr('width', this.graphWidth)
      .attr('height', this.graphHeight)
      .attr('fill', 'green')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const xAxisgroup = graph.append('g')
      .attr('transform', `translate(${0},${this.graphHeight})`)
      .attr('class', 'grid');


    const yAxisgrooup = graph.append('g')
      .attr('class', 'grid');


    const y = d3.scaleLinear()
      .range([this.graphHeight, 0]);


    const x = d3.scaleBand()
      .range([0, this.graphWidth])
      .paddingInner(0.7)
      .paddingOuter(0.7);

    const xAxis = d3.axisBottom(x)
      .tickSize(-this.svgDims.height);

    const yAxis = d3.axisLeft(y)
      .ticks(10)
      .tickSize(-this.svgDims.width)
      .tickFormat(d => `orders ${d}`);


    // tslint:disable-next-line:no-shadowed-variable
    const update = (data: Item[]) =>  {
      const  domainVar = data.map(d => d.name);

      // @ts-ignore
      const color = d3.scaleOrdinal(d3.schemeCategory10)
        // tslint:disable-next-line:no-shadowed-variable variable-name
        .domain( domainVar);


      // join updated data to elements::
      const rect = graph.selectAll('rect').data(data);
      console.log(rect);
      // remove unwanted shapes from dom
      rect.exit().remove();

      // update the domains
      y.domain([0, d3.max(data, d => d.orders)]);
      x.domain(data.map(d => d.name));

      // add attrs to rects already in the DOM
      rect.attr('width', x.bandwidth)
        .attr('fill', d => color(d.name))
        .attr('x', d => x(d.name))
        .transition().duration(1500)
        .attr('height', d => this.graphHeight - y(d.orders))
        .attr('y', d => y(d.orders));


      // append enter selection of dom
      rect.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('fill', d => color(d.name))
        .attr('x', (d) => x(d.name))
        .attr('height', 0)
        .attr('y', this.graphHeight)
        .transition().duration(1500)
        .attrTween('width', widthTween)
        .attr('height', d => this.graphHeight - y(d.orders))
        .attr('y', d => y(d.orders));

      xAxisgroup.call(xAxis);

      yAxisgrooup.call(yAxis);

      xAxisgroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end');
      xAxisgroup.selectAll('line')
        .attr('');
    };

    const widthTween  = () => {
      const i  = d3.interpolate(0, x.bandwidth());

      return (t) => {
        return i(t);
      };
    };
  }




}

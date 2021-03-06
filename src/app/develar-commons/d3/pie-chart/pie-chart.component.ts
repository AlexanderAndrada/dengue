import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Item, D3DataServiceService } from '../d3-data-service.service';

import * as d3 from 'd3';


@Component({
  selector: 'd3-pie-chart',
  styleUrls: ['./pie-chart.component.scss'],
  template: `<div id="pie"><svg></svg></div>`,
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {

  get height(): number { return parseInt(d3.select('body').style('height'), 10); }
  
  get width(): number { return parseInt(d3.select('body').style('width'), 10); }
  
  radius: number;
  
  // Arcs & pie
  private arc: any;  
  private pie: any;  
  private slices: any;
  private color: any;
  
  // Drawing containers
  private svg: any;  
  private mainContainer: any;
  
  // Data
  dataSource: Item[];

  constructor(private service: D3DataServiceService) {
    this.dataSource = this.service.getData();
  }

  ngOnInit() {
    this.svg = d3.select('#pie').select('svg');

    this.setSVGDimensions();
    
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.radius},${this.radius})`);
    
    this.pie = d3.pie().sort(null).value((d: any) => d.abs);
    
    this.draw();
  }

  private setSVGDimensions() {
    this.radius = (Math.min(this.width, this.height)) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
  }

  private setArcs() {
    this.arc = d3.arc().outerRadius(this.radius).innerRadius(this.radius * 0);
  }

  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.dataSource))
      .enter().append('g').append('path')
      .attr('d', this.arc);

    this.slices
      .attr('fill', (d, i) => this.color(i));
  }


}

import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @Input() doughnutPieChartDetails : any;
  @Input() doughnutPieChartLabelsDetails : any;

  doughnutPieChartData = [
    {
      data: [30, 40, 30,40,50,30],
    }
  ];
  doughnutPieChartLabels = ["Pink","Blue","Yellow","Skyblue","Violet","Orange","Red","LightViolet"];

  doughnutPieChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
  };

  doughnutPieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 206, 86, 1)',//yellow
        'rgba(54, 162, 235, 1)',//blue
        'rgba(75, 192, 192, 1)',//skyblue
        'rgba(255, 99, 132, 1)',  //pink
        'rgba(153, 102, 255, 1)',//vilolet
        'rgba(255, 159, 64, 1)',//orange
        'rgba(251, 24, 10, 1)',//Red
        'rgba(255, 1, 1, 1)'//LightViolet
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255,99,132,1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(251, 24, 10, 1)',
        'rgba(255, 1, 1, 1)'

      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
 
    this.doughnutPieChartData =this.doughnutPieChartDetails;
    this.doughnutPieChartLabels =this.doughnutPieChartLabelsDetails;

  }

}

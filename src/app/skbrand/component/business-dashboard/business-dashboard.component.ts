import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit{

  lineChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  lineChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];

  barChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 10, 19, 3, 5, 2, 3, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];
  barChartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];

  barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  barChartColors = [
    {
      backgroundColor: [
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
      ],
      borderColor: [
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
        'rgba(163, 161, 251, 1)',
      ],
      
    },
   
      
  ];

  areaChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: true
  }];

  areaChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(23,96,209,1)',
      backgroundColor: 'rgba(23,96,209,.2)'
    }
  ];


  doughnutPieChartData = [
    {
      data: [30, 40, 30],
    }
  ];

  doughnutPieChartLabels = ["Pink", "Blue", "Yellow"];

  doughnutPieChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  doughnutPieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    }
  ];


  scatterChartData = [
    {
      label: 'First Dataset',
      data: [{
          x: -10,
          y: 0
        },
        {
          x: 0,
          y: 3
        },
        {
          x: -25,
          y: 5
        },
        {
          x: 40,
          y: 5
        }
      ],
      borderWidth: 1
    },
    
    {
      label: 'Second Dataset',
      data: [{
          x: 10,
          y: 5
        },
        {
          x: 20,
          y: -30
        },
        {
          x: -25,
          y: 15
        },
        {
          x: -10,
          y: 5
        }
      ],
      borderWidth: 1
    }
  ];

  scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  };

  scatterChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)'      ]
    },
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

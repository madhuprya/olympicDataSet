let NoOfOlympicHosted;
let AverageAge;
let getCountriesWonMedal;

let serverUrl = "http://localhost:3000/";

function getData() {
  fetch(serverUrl + "getNoOfOlympicHosted")
    .then(data => data.json())
    .then(data => (NoOfOlympicHosted = data))
    .then(() => plotgetNoOfOlympicHosted(NoOfOlympicHosted, "problem1"));

  fetch(serverUrl + "getAverageAge")
    .then(data => data.json())
    .then(data => (AverageAge = data))
    .then(() => plotAverageAge(AverageAge, "problem3"));

  fetch(serverUrl + "getCountriesWonMedal")
    .then(data => data.json())
    .then(data => (getCountriesWonMedal = data))
    .then(() => plotgetCountriesWonMedal(getCountriesWonMedal, "problem2"));

}
getData();

function plotgetNoOfOlympicHosted(data, elementID) {
  Highcharts.chart(elementID, {
    colors: [
      "#2b908f",
      "#90ee7e",
      "#f45b5b",
      "#7798BF",
      "#aaeeee",
      "#ff0066",
      "#eeaaee",
      "#55BF3B",
      "#DF5353",
      "#7798BF",
      "#aaeeee"
    ],
    chart: {
      type: "column",
      backgroundColor: "#2c2c2c",
      plotBorderColor: "#606063"
    },
    title: {
      text: "Number of olympic hosted  per city",
      style: {
        color: "#FFFFFF",
        fontSize: "18px"
      }
    },
    xAxis: {
      categories: Object.keys(data),
      crosshair: true,
      labels: {
        style: {
          color: "#E0E0E3"
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Olympic",
        style: {
          color: "#FFFFFF",
          fontSize: "18px"
        }
      },
      labels: {
        style: {
          color: "#E0E0E3"
        }
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      showInLegend: false,
      name: "Olympic",
      colorByPoint: "true",
      data: Object.values(data)
    }]
  });
}

function plotAverageAge(data, elementID) {
  Highcharts.chart(elementID, {
    colors: [
      "#2b908f"
    ],
    chart: {    
      backgroundColor: "#2c2c2c",
      plotBorderColor: "#606063"
    },
    title: {
      text: "Average Age Per Year",
      style: {
        color: "#FFFFFF",
        fontSize: "18px"
      }
    },
    xAxis: {
      categories: Object.keys(data),
      crosshair: true,
      labels: {
        style: {
          color: "#E0E0E3"
        }
      }
    },
    
    yAxis: {
      min: 0,
      title: {
        text: "Average Age of Boxing-HeavyWeight",
        style: {
          color: "#FFFFFF",
          fontSize: "18px"
        }
      },
      labels: {
        style: {
          color: "#E0E0E3"
        }
      }
    },
    plotOptions: {
      series: {
        step: 'left' // or 'center' or 'right'
    }
    },
    credits: {
      enabled: false
    },
    series: [{
      showInLegend: false,
      name: "average_age",
      colorByPoint: "true",
      data: Object.values(data)
    }]
  });
}

function plotgetCountriesWonMedal(data, elementID) {
  Highcharts.chart(elementID, {
    chart: {
      type: 'line',
      backgroundColor: "#2c2c2c",
      plotBorderColor: "#606063"
    },
    title: {
      text: 'Top 10 countries won medals',
      style: {
        color: "#FFFFFF",
        fontSize: "18px"
      }
    },
    xAxis: {
      categories: Object.keys(data),
      crosshair: true,
      labels: {
        style: {
          color: "#E0E0E3"
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Medal Country Won '
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || 'blue'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    // tooltip: {
    //     headerFormat: '<b>{point.x}</b><br/>',
    //     pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    // },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      // showInLegend: false,
      name: "Gold",
      colorByPoint: "true",
      data: Object.values(data).values(data)
    }, {
      // showInLegend: false,
      name: "Silver",
      colorByPoint: "true",
      data: Object.values(data)
    }, {
      // showInLegend: false,
      name: "Bronze",
      colorByPoint: "true",
      data: Object.values(data)
    }]
  });
}
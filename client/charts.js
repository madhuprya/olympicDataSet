let NoOfOlympicHosted;
let AverageAge;
let getCountriesWonMedal;
let getGenderCountPerDecade;

let serverUrl = "http://localhost:3000/";

function getData() {
  fetch(serverUrl + "getNoOfOlympicHosted")
    .then(data => data.json())
    .then(data => (NoOfOlympicHosted = data))
    .then(() => plotgetNoOfOlympicHosted(NoOfOlympicHosted, "problem1"));

  fetch(serverUrl + "getAverageAge")
    .then(data => data.json())
    .then(data => (AverageAge = data))
    .then(() => plotAverageAge(AverageAge, "problem4"));

  fetch(serverUrl + "getCountriesWonMedal")
    .then(data => data.json())
    .then(data => (getCountriesWonMedal = data))
    .then(() => plotgetCountriesWonMedal(getCountriesWonMedal, "problem2"));

  fetch(serverUrl + "getGenderCountPerDecade")
    .then(data => data.json())
    .then(data => (getGenderCountPerDecade = data))
    .then(() => plotgetGenderCountPerDecade(getGenderCountPerDecade, "problem3"));

}
getData();
/********************************OLYMPIC PER COUNTRY*********************************************** */
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
/***********************************GENDER PER DECADE****************** */

function plotgetGenderCountPerDecade(data, elementID) {

  let fSeries =Object.keys(data).reduce((accumulator,event)=>{
    accumulator.push(data[event]['F']);
    return accumulator;
  },[]);

  let mSeries =Object.keys(data).reduce((accumulator,event)=>{
    accumulator.push(data[event]['M']);
    return accumulator;
  },[]);

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
      text: "Gender Count Per Decade",
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
      title: {
        text: "Gender Count",
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
        name: "MALE",
        colorByPoint: "true",
        data: mSeries
      },
      {
        showInLegend: false,
        name: "FEMALE",
        colorByPoint: "true",
        data: fSeries
      }
    ]
  });
}
/***********************************AVERAGE AGE****************** */
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
      min: 17,
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
/*******************************************MEDAL PER COUNTRY******************************** */
function plotgetCountriesWonMedal(data, elementID) {

  let gold=Object.keys(data).reduce((accumulator,event)=>{
    accumulator.push(data[event]['Gold']);
    return accumulator;
  },[]);
  let silver=Object.keys(data).reduce((accumulator,event)=>{
    accumulator.push(data[event]['Silver']);
    return accumulator;
  },[]);
  let bronze=Object.keys(data).reduce((accumulator,event)=>{
    accumulator.push(data[event]['Bronze']);
    return accumulator;
  },[]);
  
  Highcharts.chart(elementID, {
    chart: {
      type: 'column',
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
   
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: "Gold",
      colorByPoint: "true",
      data:gold
    }, {
      name: "Silver",
      colorByPoint: "true",
      data:silver
    }, {
      name: "Bronze",
      colorByPoint: "true",
      data: bronze
    }]
  });
}
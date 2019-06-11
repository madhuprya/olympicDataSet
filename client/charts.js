let NoOfOlympicHosted;
let AverageAge;
let getCountriesWonMedal;
let getGenderCountPerDecade;
let getMedalistsIndia;

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
    
  fetch(serverUrl + "getMedalistsIndia")
    .then(data => data.json())
    .then(data => (getMedalistsIndia = data))
    .then(() => plotgetgetMedalistsIndia(getMedalistsIndia, "problem5"));

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

  let fSeries =Object.values(data).map(event=>event['F']);
  let mSeries =Object.values(data).map(event=>event['M']);

  Highcharts.chart(elementID, {
    colors: [
      "#2b908f",
      "#90ee7e"
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
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderWidth: 1,
        // shadow: false,
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
        borderWidth: 0,
        dataLabels: {
          enabled: true
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [{
        name: "MALE",
        data: mSeries
      },
      {
        name: "FEMALE",
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
         // color: "#E0E0E3"
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

  let gold=Object.values(data).map(event=>event['Gold']);
  let silver=Object.values(data).map(event=>event['Silver']);
  let bronze=Object.values(data).map(event=>event['Bronze']);
  
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
      style: {
        fontWeight: 'bold',
        color: "#FFFFFF"
      },
      stackLabels: {
        enabled: true,
       
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'gray',
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
      data:gold
    }, {
      name: "Silver",
      data:silver
    }, {
      name: "Bronze",
      data: bronze
    }]
  });
}

/**************************************************************INDIAN MEDALISTS*************************** */

function plotgetgetMedalistsIndia(data,elementID){
  let indianMedalists = '';
  for(let i in data){
      
    indianMedalists += `<table>`
      
    indianMedalists += `<th>${i}</th>`
    indianMedalists += `<tr>`
      for(let j of data[i]){
        indianMedalists += `<td> ${j}</td>\n`
      
      }
      indianMedalists += `</tr>`
      indianMedalists += `</table>`
      }
  
      document.getElementById(elementID).innerHTML = indianMedalists
  }
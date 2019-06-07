let NoOfOlympicHosted;


let serverUrl = "http://localhost:3800/";

function getData() {
  fetch(serverUrl + "getNoOfOlympicHosted")
    .then(data => data.json())
    .then(data => (NoOfOlympicHosted = data))
    .then(() => plotgetNoOfOlympicHosted(NoOfOlympicHosted, "problem1"));

}
getData();

function plotNoOfMatchesPlayedChart(data, elementID) {
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
      style: { color: "#FFFFFF", fontSize: "18px" }
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
        style: { color: "#FFFFFF", fontSize: "18px" }
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
    series: [
      {
        showInLegend: false,
        name: "Olympic",
        colorByPoint: "true",
        data: Object.values(data)
      }
    ]
  });
}

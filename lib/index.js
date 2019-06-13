"use strict";

var _parseCsv = _interopRequireDefault(require("./parseCsv"));

var _olympic = require("./olympic");

var _fileio = require("./fileio");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _parseCsv.default)().then(async data => {
  let athlete_events = data.athlete_events;

  try {
    await (0, _fileio.writeFile)("./output/getNoOfOlympicHosted.json", (0, _olympic.getNoOfOlympicHosted)(athlete_events));
    await (0, _fileio.writeFile)("./output/getCountriesWonMedal.json", (0, _olympic.getCountriesWonMedal)(athlete_events, 'NA', 2000));
    await (0, _fileio.writeFile)("./output/getGenderCountPerDecade.json", (0, _olympic.getGenderCountPerDecade)(athlete_events));
    await (0, _fileio.writeFile)("./output/getAverageAge.json", (0, _olympic.getAverageAge)(athlete_events, "Boxing Men's HeavyWeight", 'NA'));
    await (0, _fileio.writeFile)("./output/getMedalistsOfCountry.json", (0, _olympic.getMedalistsOfCountry)(athlete_events, 'India', 'NA'));
  } catch (error) {
    console.log(error);
  }
});
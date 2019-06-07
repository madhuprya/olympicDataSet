"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _csvtojson = _interopRequireDefault(require("csvtojson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var csv=require("csvtojson");
// let convertToJson = async filePath => {
//   let array = await csv().fromFile(filePath);
//   return array;
// };
// let getGames = async () => {
//   let athlete_events = await convertToJson("./data/athlete_events.csv");
//   let noc_regions = await convertToJson("./data/noc_regions.csv");
//   console.log(athlete_events);
//   return {
//     athlete_events,
//     noc_regions
//   }
// };
// module.exports=convertToJson;
let convertToJson = async filePath => {
  let array = await (0, _csvtojson.default)().fromFile(filePath);
  return array;
};

let getGames = async () => {
  let athlete_events = await convertToJson("./data/athlete_events.csv");
  let noc_regions = await convertToJson("./data/noc_regions.csv");
  return {
    athlete_events,
    noc_regions
  };
};

var _default = getGames;
exports.default = _default;
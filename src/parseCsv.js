

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















import csv from "csvtojson";
let convertToJson = async filePath => {
  let array = await csv().fromFile(filePath);
  return array;
};

let getGames = async () => {
  let athlete_events = await convertToJson("./data/athlete_events.csv");
  let noc_regions = await convertToJson("./data/noc_regions.csv");
  return {
    athlete_events,
    noc_regions
  }
};

 export default getGames;

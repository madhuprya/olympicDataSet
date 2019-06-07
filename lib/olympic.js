"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountriesWonMedal = exports.getNoOfOlympicHosted = void 0;

function getUniqueGames(events, games) {
  const uniqueGames = events.map(event => event[games]).map((game, index, event_games) => event_games.indexOf(game) === index && index).filter(event => events[event]).map(event => events[event]);
  return uniqueGames;
}

const getNoOfOlympicHosted = athlete_events => {
  return getUniqueGames(athlete_events, 'Games').reduce((accumulator, event) => {
    if (accumulator.hasOwnProperty(event.City)) {
      accumulator[event.City]++;
    } else {
      accumulator[event.City] = 1;
    }

    return accumulator;
  }, {});
};

exports.getNoOfOlympicHosted = getNoOfOlympicHosted;

function getMedal(events, medal) {
  const medal_events = events.filter(event => event[medal] === 'Gold' | event[medal] === 'Silver' | event[medal] === 'Bronze' && event.Year > 2000);
  return medal_events;
}

const getCountriesWonMedal = athlete_events => {
  return getMedal(athlete_events, 'Medal').reduce((result, event) => {
    if (result.hasOwnProperty(event.Team)) {
      result[event.Team]['medal_count'] += 1;

      if (event.Medal === 'Gold') {
        result[event.Team]['Gold'] += 1;
      }

      if (event.Medal === 'Silver') {
        result[event.Team]['Silver'] += 1;
      }

      if (event.Medal === 'Bronze') {
        result[event.Team]['Bronze'] += 1;
      }
    } else {
      result[event.Team] = {};
      result[event.Team]['Gold'] = 0;
      result[event.Team]['Silver'] = 0;
      result[event.Team]['Bronze'] = 0;
      result[event.Team]['medal_count'] = 1;

      if (event.Medal === 'Gold') {
        result[event.Team]['Gold'] = 1;
      }

      if (event.Medal === 'Silver') {
        result[event.Team]['Silver'] = 1;
      }

      if (event.Medal === 'Bronze') {
        result[event.Team]['Bronze'] = 1;
      }
    }

    const MedalArray = Object.keys(result).map(i => result[i]);
    console.log(MedalArray);
    console.log(MedalArray.sort(function (a, b) {
      return a.medal_count < b.medal_count ? 1 : -1;
    }).slice(0, 10));
  }, {});
}; //**2nd problem **/
// var parseCsv=require('./parseCsv')
// const getNoOfOlympicHosted = async() => {
//   var athlete_events=await parseCsv('../data/athlete_events.csv');
//   var res=[];
//   return athlete_events.reduce( (accumulator, event)=>{
//   if(res.indexOf(event.Games) === -1){
//     res.push(event.Games);
//     if(accumulator.hasOwnProperty(event.City))
//     {
//       accumulator[event.City]++;
//     }
//     else{
//       accumulator[event.City]=1;
//     }
//   }
//   console.log(accumulator);
//   }, {});
// };
// getNoOfOlympicHosted();


exports.getCountriesWonMedal = getCountriesWonMedal;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMedalistsIndia = exports.getAverageAge = exports.getGenderCountPerDecade = exports.getCountriesWonMedal = exports.getNoOfOlympicHosted = void 0;

/*******************************Questions-1 *********************************/
function getUniqueGames(events, games) {
  const uniqueGames = events.map(event => event[games]).map((game, index, event_games) => event_games.indexOf(game) === index && index).filter(event => events[event]).map(event => events[event]);
  return uniqueGames;
}

const getNoOfOlympicHosted = athlete_events => {
  return getUniqueGames(athlete_events, 'Games').reduce((result, event) => {
    if (result.hasOwnProperty(event.City)) {
      result[event.City]++;
    } else {
      result[event.City] = 1;
    }

    return result;
  }, {});
};
/*******************************Questions-2 *********************************/


exports.getNoOfOlympicHosted = getNoOfOlympicHosted;

function getMedal(events, medal) {
  const medal_events = events.filter(event => event[medal] === 'Gold' | event[medal] === 'Silver' | event[medal] === 'Bronze' && event.Year > 2000);
  return medal_events;
}

const getCountriesWonMedal = athlete_events => {
  let result = getMedal(athlete_events, 'Medal').reduce((result, event) => {
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

    return result;
  }, {});
  let medalResult = {};
  Object.keys(result).sort((a, b) => {
    return result[b]['medal_count'] - result[a]['medal_count'];
  }).slice(0, 10).map(e => {
    medalResult[e] = result[e];
  });
  return medalResult;
}; //**3rd problem **/


exports.getCountriesWonMedal = getCountriesWonMedal;

function decadeCount(year) {
  var decade = Math.round((year - 1890) / 10);
  return Math.floor(decade);
}

const getGenderCountPerDecade = athlete_events => {
  let genderPerYear = athlete_events.reduce((result, item) => {
    if (!result.hasOwnProperty(item.Games)) {
      result[item.Games] = {};
      result[item.Games]['id'] = {};
      result[item.Games]['id'][item.ID] = 1;
      result[item.Games]['M'] = 0;
      result[item.Games]['F'] = 0;
      result[item.Games][item.Sex] += 1;
    } else if (!result[item.Games]['id'].hasOwnProperty(item.ID)) {
      result[item.Games]['id'][item.ID] = 1;
      result[item.Games][item.Sex] += 1;
    }

    return result;
  }, {});
  let gender = Object.keys(genderPerYear).reduce((result, item) => {
    result[item] = {};
    result[item]["M"] = genderPerYear[item]["M"];
    result[item]['F'] = genderPerYear[item]["F"];
    return result;
  }, []);
  return Object.keys(gender).reduce((result, item) => {
    var decStart = parseInt(item.substring(0, 3)) * 10;
    var decEnd = parseInt(decStart) + 9;
    var decade = parseInt(decStart) + '-' + decEnd;

    if (!result.hasOwnProperty(decade)) {
      result[decade] = {};
      result[decade]['M'] = gender[item]['M'];
      result[decade]['F'] = gender[item]['F'];
    } else {
      result[decade]['M'] += gender[item]['M'];
      result[decade]['F'] += gender[item]['F'];
    }

    return result;
  }, {});
};
/*******************************Questions-4*********************************/


exports.getGenderCountPerDecade = getGenderCountPerDecade;

function getBoxingEvents(events, event, age) {
  const boxing_event = events.filter(item => item[event] === "Boxing Men's Heavyweight" && item[age] != 'NA');
  return boxing_event;
}

const getAverageAge = athlete_events => {
  let avg_age = getBoxingEvents(athlete_events, 'Event', 'Age').reduce((result, event) => {
    if (result.hasOwnProperty(event.Year)) {
      result[event.Year]['Age_Sum'] += parseInt(event.Age);
      result[event.Year]['Count'] += 1;
    } else {
      result[event.Year] = {};
      result[event.Year]['avg_age'] = 0;
      result[event.Year]['Age_Sum'] = parseInt(event.Age);
      result[event.Year]['Count'] = 1;
    }

    result[event.Year]['avg_age'] = Math.floor(result[event.Year]['Age_Sum'] / result[event.Year]['Count']);
    return result;
  }, {});
  return Object.keys(avg_age).reduce((result, item) => {
    result[item] = avg_age[item]['avg_age'];
    return result;
  }, {});
};
/*******************************Questions-5*********************************/


exports.getAverageAge = getAverageAge;

function getIndianMedalists(events, team, medal) {
  const indian_medalists = events.filter(item => item[team] === 'India' && item[medal] !== 'NA');
  return indian_medalists;
}

const getMedalistsIndia = athlete_events => {
  //console.log(getIndianMedalists(athlete_events,'Team','Medal'));
  return getIndianMedalists(athlete_events, 'Team', 'Medal').reduce((indiaResult, event) => {
    if (indiaResult.hasOwnProperty(event.Games)) {
      if (indiaResult[event.Games].indexOf(event.Name) == -1) {
        indiaResult[event.Games].push(event.Name);
      }
    } else {
      indiaResult[event.Games] = [];
      indiaResult[event.Games].push(event.Name);
    }

    return indiaResult;
  }, {});
};
/*********************************************DECADE */


exports.getMedalistsIndia = getMedalistsIndia;
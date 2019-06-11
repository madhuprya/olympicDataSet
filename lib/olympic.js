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
/*******************************Questions-2*********************************/


exports.getNoOfOlympicHosted = getNoOfOlympicHosted;

function getMedal(events, medal, year) {
  return events.filter(event => event['Medal'] !== medal).filter(event => event.Year > year);
}

const getCountriesWonMedal = athlete_events => {
  let MedalCountry = getMedal(athlete_events, 'NA', 2000);
  let result = MedalCountry.reduce((result, event) => {
    if (result.hasOwnProperty(event.Team)) {
      if (!result[event.Team].hasOwnProperty(event.Medal)) {
        result[event.Team][event.Medal] = 1;
      } else {
        result[event.Team][event.Medal] += 1;
      }

      result[event.Team]['medal_count'] += 1;
    } else {
      result[event.Team] = {};

      if (!result[event.Team].hasOwnProperty(event.Medal)) {
        result[event.Team][event.Medal] = 1;
        result[event.Team]['medal_count'] = 1;
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
  }, {});
  let result = Object.keys(gender).reduce((result, item) => {
    var decVal = decadeCount(parseInt(item.substring(0, 4)));
    var decStart = parseInt(item.substring(0, 3)) * 10;
    var decEnd = parseInt(decStart) + 9;
    var decade = parseInt(decStart) + '-' + decEnd;

    if (!result.hasOwnProperty(decade)) {
      result[decade] = {};
      result[decade]['decadeValue'] = decVal;
      result[decade]['M'] = gender[item]['M'];
      result[decade]['F'] = gender[item]['F'];
    } else {
      result[decade]['M'] += gender[item]['M'];
      result[decade]['F'] += gender[item]['F'];
    }

    return result;
  }, {});
  let sortedDecade = {};
  Object.keys(result).sort((a, b) => {
    return result[a]['decadeValue'] - result[b]['decadeValue'];
  }).map(e => {
    sortedDecade[e] = result[e];
  });
  return sortedDecade;
};
/*******************************Questions-4*********************************/


exports.getGenderCountPerDecade = getGenderCountPerDecade;

function getBoxingEvents(events, event, age) {
  const boxing_event = events.filter(item => item['Event'] === event && item['Age'] != age);
  return boxing_event;
}

const getAverageAge = athlete_events => {
  let BoxingEvent = getBoxingEvents(athlete_events, "Boxing Men's Heavyweight", 'NA');
  let avg_age = BoxingEvent.reduce((result, event) => {
    if (result.hasOwnProperty(event.Year)) {
      result[event.Year]['age_sum'] += parseInt(event.Age);
      result[event.Year]['count'] += 1;
    } else {
      result[event.Year] = {};
      result[event.Year]['avg_age'] = 0;
      result[event.Year]['age_sum'] = parseInt(event.Age);
      result[event.Year]['count'] = 1;
    }

    result[event.Year]['avg_age'] = Math.floor(result[event.Year]['age_sum'] / result[event.Year]['count']);
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
  const indian_medalists = events.filter(item => item['Team'] === team && item['Medal'] !== medal);
  return indian_medalists;
}

const getMedalistsIndia = athlete_events => {
  let indianMedalists = getIndianMedalists(athlete_events, 'India', 'NA');
  return indianMedalists.reduce((indiaResult, event) => {
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
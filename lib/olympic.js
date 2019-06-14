"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMedalistsOfCountry = exports.getAverageAge = exports.getGenderCountPerDecade = exports.getCountriesWonMedal = exports.getNoOfOlympicHosted = void 0;

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

function getMedal(events, noc, medal, year) {
  let countryMedal = events.filter(event => event['Medal'] !== medal).filter(event => event.Year > year);

  for (let value of Object.values(countryMedal)) {
    value['NOC'] = noc[value['NOC']];
  }

  return countryMedal;
}

const getCountriesWonMedal = function (athlete_events, noc_regions, medal, year) {
  let nocToRegion = noc_regions.reduce((accumulator, event) => {
    accumulator[event.NOC] = event.region;
    return accumulator;
  }, {});
  let MedalCountry = getMedal(athlete_events, nocToRegion, medal, year); // console.log(MedalCountry);

  let result = MedalCountry.reduce((result, event) => {
    if (result.hasOwnProperty(event.NOC)) {
      if (!result[event.NOC].hasOwnProperty(event.Medal)) {
        result[event.NOC][event.Medal] = 1;
      } else {
        result[event.NOC][event.Medal] += 1;
      }

      result[event.NOC]['medal_count'] += 1;
    } else {
      result[event.NOC] = {};

      if (!result[event.NOC].hasOwnProperty(event.Medal)) {
        result[event.NOC][event.Medal] = 1;
        result[event.NOC]['medal_count'] = 1;
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
  let sortedRes = {};
  let sortedDecade = Object.keys(result).sort((a, b) => parseInt(a.substring(0, 4)) - parseInt(b.substring(0, 4)));

  for (const dec of sortedDecade) {
    sortedRes[dec] = result[dec];
  }

  return sortedRes;
};
/*******************************Questions-4*********************************/


exports.getGenderCountPerDecade = getGenderCountPerDecade;

function getEvents(events, event, age) {
  const boxing_event = events.filter(item => item['Event'] === event && item['Age'] != age);
  return boxing_event;
}

const getAverageAge = function (athlete_events, event, age) {
  let BoxingEvent = getEvents(athlete_events, event, age);
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

function getMedalists(events, team, medal) {
  const indian_medalists = events.filter(item => item['Team'] === team && item['Medal'] !== medal);
  return indian_medalists;
}

const getMedalistsOfCountry = function (athlete_events, team, medal) {
  let indianMedalists = getMedalists(athlete_events, team, medal);
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


exports.getMedalistsOfCountry = getMedalistsOfCountry;
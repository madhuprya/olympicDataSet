/*******************************Questions-1 *********************************/
function getUniqueGames(events, games) {
  const uniqueGames = events
    .map(event => event[games])
    .map((game, index, event_games) => event_games.indexOf(game) === index && index)
    .filter(event => events[event]).map(event => events[event]);
  return uniqueGames;
}
export const getNoOfOlympicHosted = athlete_events => {
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
function getMedal(events, noc, medal, year) {
  console.log(Object.values(noc));
  let countryMedal = events.filter(event => (event['Medal'] !== medal)).filter(event => (event.Year > year));

  for (let value of Object.entries(noc)) {
    for (let val of Object.values(countryMedal)) {
      if (val['NOC'] === value[0]) {
        val['NOC']=value[1];
      }
    }
  }
  return countryMedal;
}
export const getCountriesWonMedal = function (athlete_events, noc_regions, medal, year) {
  let nocToRegion = noc_regions.reduce((accumulator, event) => {
    accumulator[event.NOC] = event.region;
    return accumulator;
  }, {});

  let MedalCountry = getMedal(athlete_events, nocToRegion, medal, year);
  //console.log(MedalCountry);

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
  Object.entries(result).sort((a, b) => {
    return b[1]['medal_count'] - a[1]['medal_count'];
  }).slice(0, 10).map(e => {
    medalResult[e[0]] = e[1];
  });
  return medalResult;
};

//**3rd problem **/

export const getGenderCountPerDecade = athlete_events => {
  let genderPerYear = athlete_events.reduce((result, item) => {
    if (!result.hasOwnProperty(item.Games)) {
      result[item.Games] = {};
      result[item.Games]['id'] = {};
      result[item.Games]['id'][item.ID] = 1;
      result[item.Games]['M'] = 0;
      result[item.Games]['F'] = 0
      result[item.Games][item.Sex] += 1;
    } else if (!result[item.Games]['id'].hasOwnProperty(item.ID)) {
      result[item.Games]['id'][item.ID] = 1;
      result[item.Games][item.Sex] += 1;
    }
    return result
  }, {})
  let gender = Object.entries(genderPerYear).reduce((result, item) => {
    result[item[0]] = item[1];
    return result;
  }, {});
  let result = Object.entries(gender).reduce((result, item) => {

    var decStart = parseInt(item[0].substring(0, 3)) * 10;
    var decEnd = parseInt(decStart) + 9;
    var decade = parseInt(decStart) + '-' + decEnd;

    if (!result.hasOwnProperty(decade)) {
      result[decade] = {};
      result[decade]['M'] = item[1]['M'];
      result[decade]['F'] = item[1]['F'];
    } else {
      result[decade]['M'] += item[1]['M'];
      result[decade]['F'] += item[1]['F'];
    }
    return result;
  }, {});
  let sortedRes = {};
  Object.entries(result).sort((a, b) => parseInt(a[0].substring(0, 4)) - parseInt(b[0].substring(0, 4)))
    .map(event => {
      return sortedRes[event[0]] = event[1]
    });

  return sortedRes;
}

/*******************************Questions-4*********************************/
function getEvents(events, event, age) {
  const boxing_event =
    events.filter(item => (item['Event'] === event) && item['Age'] != age);
  return boxing_event;
}
export const getAverageAge = function (athlete_events, event, age) {
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
  return Object.entries(avg_age).reduce((result, item) => {
    result[item[0]] = item[1]['avg_age'];
    return result;
  }, {});
};

/*******************************Questions-5*********************************/
function getMedalists(events, team, medal) {
  const indian_medalists =
    events.filter(item => (item['Team'] === team) && item['Medal'] !== medal);
  return indian_medalists;
}


export const getMedalistsOfCountry = function (athlete_events, team, medal) {
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
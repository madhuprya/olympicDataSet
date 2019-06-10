"use strict";

let nocRegions = require("../input/nocRegions.json");

let athleteEvents = require("../input/athleteEvents.json"); // 1st question 


function olympicsHostedByCities(athleteEvents) {
  let hostCities = athleteEvents.reduce(function (hostCity, yearHosted) {
    if (!hostCity.hasOwnProperty(yearHosted.City)) {
      hostCity[yearHosted.City] = [];
      hostCity[yearHosted.City].push(yearHosted.Year);
    } else if (hostCity[yearHosted.City].indexOf(yearHosted.Year) === -1) {
      hostCity[yearHosted.City].push(yearHosted.Year);
    }

    return hostCity;
  }, {});
  const noOfTimesOlympicsHostedByEachCity = Object.keys(hostCities).reduce(function (host, frequency) {
    host[frequency] = hostCities[frequency].length;
    return host;
  }, {});
  return noOfTimesOlympicsHostedByEachCity;
} // console.log(olympicsHostedByCities(athleteEvents));
// 2nd Question


function century(athleteEvents, year) {
  let after2000 = athleteEvents.filter(item => {
    return item.Year > year && item.Medal !== 'NA';
  });
  return after2000;
} // console.log(century(athleteEvents));


function mostMedalsWonByCountries(athleteEvents, nocRegions) {
  let athleteEventsAfterMillenia = century(athleteEvents, 2000);
  let medalsWonByCountry = athleteEventsAfterMillenia.reduce(function (countriesAndMedals, item) {
    if (countriesAndMedals.hasOwnProperty(item.NOC) && countriesAndMedals[item.NOC].hasOwnProperty(item.Medal)) {
      countriesAndMedals[item.NOC][item.Medal]++;
      countriesAndMedals[item.NOC]['medalsWon']++;
    } else if (countriesAndMedals.hasOwnProperty(item.NOC) && !countriesAndMedals[item.NOC].hasOwnProperty(item.Medal)) {
      countriesAndMedals[item.NOC][item.Medal] = 1;
      countriesAndMedals[item.NOC]['medalsWon']++;
    } else if (!countriesAndMedals.hasOwnProperty(item.NOC)) {
      countriesAndMedals[item.NOC] = {};
      countriesAndMedals[item.NOC][item.Medal] = 1;
      countriesAndMedals[item.NOC]['medalsWon'] = 1;
    }

    return countriesAndMedals;
  }, []); // let x =  nocRegions.reduce(function(countryName,item){
  //     if(medalsWonByCountry.hasOwnProperty(item.NOC)){
  //         countryName[item.region] = medalsWonByCountry[item.NOC]
  //     }
  //     return countryName;
  // },{})

  let topTenCountriesToWinTheMostMedals = Object.keys(medalsWonByCountry).sort((a, b) => {
    return medalsWonByCountry[b]["medalsWon"] - medalsWonByCountry[a]["medalsWon"];
  }).slice(0, 10).reduce((topTen, item) => {
    topTen[item] = medalsWonByCountry[item];
    return topTen;
  }, []);
  let x = nocRegions.reduce(function (countryName, item) {
    if (topTenCountriesToWinTheMostMedals.hasOwnProperty(item.NOC)) {
      countryName[item.region] = topTenCountriesToWinTheMostMedals[item.NOC];
    }

    return countryName;
  }, {});
  let mostNoOfMedalsWonByCountriesIn21stCentury = Object.keys(topTenCountriesToWinTheMostMedals).reduce((acc, cur) => {
    acc[cur] = {};
    acc[cur]["Gold"] = topTenCountriesToWinTheMostMedals[cur]["Gold"];
    acc[cur]['Silver'] = topTenCountriesToWinTheMostMedals[cur]["Silver"];
    acc[cur]['Bronze'] = topTenCountriesToWinTheMostMedals[cur]["Bronze"];
    return acc;
  }, {});
  return mostNoOfMedalsWonByCountriesIn21stCentury;
}

console.log(mostMedalsWonByCountries(athleteEvents, nocRegions)); // 4th Question

function boxingEventsInOlympics(athleteEvents) {
  return athleteEvents.filter(item => {
    return item.Event === "Boxing Men's Heavyweight" && item.Age !== 'NA';
  });
} // console.log(boxingEventsInOlympics(athleteEvents))


function averageAgeOfAthletesInBoxing(athleteEvents) {
  let boxingEvents = boxingEventsInOlympics(athleteEvents);
  let totalAgeAndCountOfAthletes = boxingEvents.reduce(function (totalAge, item) {
    if (totalAge.hasOwnProperty(item.Year)) {
      totalAge[item.Year]['totalAge'] += parseInt(item.Age);
      totalAge[item.Year]['noOfAthletes']++;
    } else {
      totalAge[item.Year] = {};
      totalAge[item.Year]['totalAge'] = parseInt(item.Age);
      totalAge[item.Year]['noOfAthletes'] = 1;
    }

    return totalAge;
  }, {});
  let averageAge = Object.keys(totalAgeAndCountOfAthletes).reduce(function (average, item) {
    average[item] = totalAgeAndCountOfAthletes[item]['totalAge'] / totalAgeAndCountOfAthletes[item]['noOfAthletes'];
    return average;
  }, {});
  return averageAge;
} // console.log(averageAgeOfAthletesInBoxing(athleteEvents))
// 5th Question


function indianWinners(athleteEvents, country) {
  return athleteEvents.filter(item => {
    return item.Team === country && item.Medal !== 'NA';
  });
} // console.log(indianWinners(athleteEvents))


function prideOfIndia(athleteEvents) {
  let winnersfromIndia = indianWinners(athleteEvents, "India");
  let indianWinnersbySeason = winnersfromIndia.reduce(function (winner, item) {
    if (winner.hasOwnProperty(item.Games)) {
      if (winner[item.Games].indexOf(item.Name) === -1) {
        winner[item.Games].push(item.Name);
      }
    } else {
      winner[item.Games] = [];
      winner[item.Games].push(item.Name);
    }

    return winner;
  }, {});
  return indianWinnersbySeason;
} // console.log(prideOfIndia(athleteEvents))
// 3rd Question


function genderParticipationByDecade(athleteEvents) {
  let genderParticipationByYear = athleteEvents.reduce(function (gender, item) {
    if (!gender.hasOwnProperty(item.Games)) {
      gender[item.Games] = {};
      gender[item.Games]['id'] = {};
      gender[item.Games]['id'][item.ID] = 1;
      gender[item.Games]['M'] = 0;
      gender[item.Games]['F'] = 0;
      gender[item.Games][item.Sex] += 1;
    } else if (!gender[item.Games]['id'].hasOwnProperty(item.ID)) {
      gender[item.Games]['id'][item.ID] = 1;
      gender[item.Games][item.Sex] += 1;
    }

    return gender;
  }, {});
  let genderParticipationByYearWithoutID = Object.keys(genderParticipationByYear).reduce(function (withoutId, item) {
    withoutId[item] = {};
    withoutId[item]["M"] = genderParticipationByYear[item]["M"];
    withoutId[item]['F'] = genderParticipationByYear[item]["F"];
    return withoutId;
  }, []);
  let genderParticipationDecadeWise = Object.keys(genderParticipationByYearWithoutID).reduce(function (gender, item) {
    if (!gender.hasOwnProperty(item.substring(0, 3))) {
      gender[item.substring(0, 3)] = {};
      gender[item.substring(0, 3)]['M'] = genderParticipationByYearWithoutID[item]['M'];
      gender[item.substring(0, 3)]['F'] = genderParticipationByYearWithoutID[item]['F'];
    } else {
      gender[item.substring(0, 3)]['M'] += genderParticipationByYearWithoutID[item]['M'];
      gender[item.substring(0, 3)]['F'] += genderParticipationByYearWithoutID[item]['F'];
    }

    return gender;
  }, {});
  return genderParticipationDecadeWise;
} // console.log(genderParticipationByDecade(athleteEvents))


module.exports = {
  olympicsHostedByCities,
  mostMedalsWonByCountries,
  genderParticipationByDecade,
  averageAgeOfAthletesInBoxing,
  prideOfIndia
};
import getData from "./parseCsv";
import {
  getNoOfOlympicHosted,
  getCountriesWonMedal,
  getGenderCountPerDecade,
  getAverageAge,
  getMedalistsOfCountry

} from "./olympic";
import {
  writeFile
} from "./fileio";

getData().then(async data => {
  let athlete_events = data.athlete_events;
  let noc_regions = data.noc_regions;
  try {

    await writeFile(
      "./output/getNoOfOlympicHosted.json",
      getNoOfOlympicHosted(athlete_events)
    );
    await writeFile(
      "./output/getCountriesWonMedal.json",
      getCountriesWonMedal(athlete_events,noc_regions,'NA',2000)
    );
    await writeFile(
      "./output/getGenderCountPerDecade.json",
      getGenderCountPerDecade(athlete_events)
    );
    await writeFile(
      "./output/getAverageAge.json",
      getAverageAge(athlete_events,"Boxing Men's HeavyWeight",'NA')
    );
    await writeFile(
      "./output/getMedalistsOfCountry.json",
      getMedalistsOfCountry(athlete_events,'India','NA')
    );
    
  } catch (error) {
    console.log(error);
  }
});
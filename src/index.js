import getData from "./parseCsv";
import {
  getNoOfOlympicHosted,
  getCountriesWonMedal,
  getGenderCountPerDecade,
  getAverageAge,
  getMedalistsIndia

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
      getCountriesWonMedal(athlete_events)
    );
    await writeFile(
      "./output/getGenderCountPerDecade.json",
      getGenderCountPerDecade(athlete_events)
    );
    await writeFile(
      "./output/getAverageAge.json",
      getAverageAge(athlete_events)
    );
    await writeFile(
      "./output/getMedalistsIndia.json",
      getMedalistsIndia(athlete_events)
    );
    
  } catch (error) {
    console.log(error);
  }
});
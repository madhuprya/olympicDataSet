import getData from "./parseCsv";
import {
  getNoOfOlympicHosted,
  getCountriesWonMedal

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

  } catch (error) {
    console.log(error);
  }
});
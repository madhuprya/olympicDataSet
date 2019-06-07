/*******************************Questions-1 *********************************/
function getUniqueGames(events, games) {
  const uniqueGames = events
       .map(event => event[games])
    .map((game, index, event_games) => event_games.indexOf(game) === index && index)
    .filter(event => events[event]).map(event => events[event]);
   return uniqueGames;
}
export const getNoOfOlympicHosted = athlete_events => { 
 return getUniqueGames(athlete_events,'Games').reduce( (result, event)=>{
    if(result.hasOwnProperty(event.City))
    {
      result[event.City]++;
    }
    else{
      result[event.City]=1;
    }
  return result;
  }, {});      
};

/*******************************Questions-2 *********************************/
function getMedal(events, medal){
  const medal_events = 
  events.filter(event=>(event[medal]==='Gold'| event[medal]==='Silver' |event[medal]==='Bronze') && event.Year>2000);
  return medal_events;
}
export const getCountriesWonMedal = athlete_events => {
  var result={};
  getMedal(athlete_events,'Medal').reduce((acc,event)=>{
    if(result.hasOwnProperty(event.Team)){
      result[event.Team]['medal_count']+=1;
      if(event.Medal==='Gold'){
        result[event.Team]['Gold']+=1;
      }
      if(event.Medal==='Silver'){
        result[event.Team]['Silver']+=1;
      }
      if(event.Medal==='Bronze'){
        result[event.Team]['Bronze']+=1;
      }
    }
    else{
      result[event.Team]={};
      result[event.Team]['Gold'] = 0;
      result[event.Team]['Silver'] = 0;
      result[event.Team]['Bronze'] = 0;
      result[event.Team]['medal_count']=1;
      if(event.Medal==='Gold'){
        result[event.Team]['Gold'] = 1;
      }
      if(event.Medal==='Silver'){
        result[event.Team]['Silver'] = 1;
      }
      if(event.Medal==='Bronze'){
        result[event.Team]['Bronze'] = 1;
      }
    }
  },{});
  var arr=Object.keys(result).sort((a,b)=>{
    return result[b]['medal_count']-result[a]['medal_count'];}).slice(0,10).map(e=>{
      let t={};
      t[e]=result[e];
      return t;
    });
  return arr;
};

//**3rd problem **/

function decadeCount(year){
  var decade = (year-1896)/10;
  return Math.round(decade+1);
}
 export const getGenderCountPerDecade = athlete_events=>{
    return athlete_events.reduce((result,event)=>{
    var decade=decadeCount(event.Year);
    if(result.hasOwnProperty(decade)){
      if(event.Sex==='M'){
        result[decade]['M']+=1;
      }
      if(event.Sex==='F'){
        result[decade]['F']+=1;
      }
    }
    else{
      result[decade]={};
      result[decade]['M']=0;
      result[decade]['F']=0;
      if(event.Sex==='M'){
        result[decade]['M']=1;
      }
      if(event.Sex==='F'){
        result[decade]['F']=1;
      }
    }
   return result;
  },{}); 
 };




























// var parseCsv=require('./parseCsv')
// const getNoOfOlympicHosted = async() => {
//   var athlete_events=await parseCsv('../data/athlete_events.csv');
//   var res=[];
//   return athlete_events.reduce( (result, event)=>{
//   if(res.indexOf(event.Games) === -1){
//     res.push(event.Games);
//     if(result.hasOwnProperty(event.City))
//     {
//       result[event.City]++;
//     }
//     else{
//       result[event.City]=1;
//     }
//   }
  
//   console.log(result);
//   }, {});
// };
// getNoOfOlympicHosted();
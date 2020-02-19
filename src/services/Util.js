import * as http from './index';

export const isSignedIn = () => {
  if(localStorage.getItem("access-token")?.length > 0){
    return true;
  }
  return false;
}

export const contentRatingMapping = (content_rating) => {
  console.log(content_rating)
  if(content_rating === "general_audiences"){
    return 'G';
  } else if(content_rating === "parental_guidance") {
    return 'PG';
  } else if(content_rating === "parents_strongly_cautioned") {
    console.log('here')
    return 'PG-13';
  } else if(content_rating === "restricted") {
    return 'R';
  } else if(content_rating === "adults_only") {
    return 'NC-17';
  } else {
    return 'PG-13';
  }
}

export const getHoursAndMinutes = (minutes) => {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  return h + 'h ' + m + 'min';
}

export const getWatchlistCount = () => {
  http.getWatchlistCount()
    .then(res => {
      return res.data.count
    })
}


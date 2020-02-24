import * as urls from '../urls'
import Http from "../services/HttpService";

const headers = {
  'Content-Type':'application/json'
}

const formheaders = {
  'Content-Type':'multipart/form-data'
}

export const loginUser = data => {
  return Http.post(urls.LOGIN_URL, data, {
    headers: headers
  })
}

export const logoutUser = () => {
  const data = {
    "access-token": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  }

  return Http.delete(urls.LOGOUT_URL, { "data": data }, {
    headers: headers
  })
}

export const getMovies = (data = null) => {
  return Http.get(urls.MOVIES_URL, {params: {query: data}})
}

export const getFilms = (data = null) => {
  return Http.get(urls.FILMS_URL, {params: {query: data}})
}

export const getMovieDetails = (id) => {
  return Http.get(urls.MOVIES_URL + '/' + id);
}

export const getCelebrityDetails = (id) => {
  return Http.get(urls.CELEBRITY_URL + '/' + id);
}

export const getGenres = () => {
  return Http.get(urls.GENRES_URL)
}

export const createMovies = data => {
  for (var key of data.entries()) {
    console.log(key[0] + ', ' + key[1])
  }
  return Http.post(urls.MOVIES_URL, data, { headers: formheaders })
}

export const signupUser = data => {
  return Http.post(urls.SIGNUP_URL, data, { headers: formheaders })
}

export const getWatchlistFilms = () => {
  return Http.get(urls.WATCHLIST_URL)
}

export const getWatchlistCount = () => {
  return Http.post(urls.WATCHLIST_COUNT_URL)
}

export const getWatchlistIds = () => {
  return Http.get(urls.WATCHLIST_FILMS_IDS_URL)
}

export const getWatchlistSeasonIds = () => {
  return Http.get(urls.WATCHLIST_SEASON_IDS_URL)
}

export const getWatchlistEpisodeIds = () => {
  return Http.get(urls.WATCHLIST_EPISODE_IDS_URL)
}

export const getTvShowDetails = (id) => {
  return Http.get(urls.TV_SHOWS_URL + '/' + id)
}

export const getSeasonDetails = (tv_show_id, id) => {
  return Http.get(urls.TV_SHOWS_URL + '/' + tv_show_id + '/seasons/' + id)
}

export const getEpisodeDetails = (tv_show_id, season_id, id) => {
  return Http.get(urls.TV_SHOWS_URL + '/' + tv_show_id + '/seasons/' + season_id + '/episodes/' + id)
}

export const updateWatchlistShows = (params) => {
  return Http.post(urls.UPDATE_WATCHLIST_URL, params, {headers: headers})
}
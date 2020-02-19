import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import * as http from '../services/index';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WatchListGrid from '../Components/FilmGridList'
import Card from '@material-ui/core/Card';
import { watchlist } from '../Assets/styles/watchlist';
import Typography from '@material-ui/core/Typography';

class Watchlist extends Component { 
  constructor(props){
    super(props);
    this.state = {
      movies : [],
      tv_shows: [],
      seasons: [],
      episodes: [],
      films_on_watchlist: [],
      seasons_on_watchlist: [],
      episodes_on_watchlist: [],
    }
  }

  componentDidMount = () => {
    var movies_arr = []
    var tv_shows_arr = []

    http.getWatchlistFilms()
    .then(res => {
      console.log(res)
      res.data.films.map(film => {
        if(film.media_type === "Movie"){
          movies_arr.push(film.movie)
        } else {
          tv_shows_arr.push(film.tv_show)
        }
        return null;
      })

      this.setState({
        movies: movies_arr,
        tv_shows: tv_shows_arr,
        seasons: res.data.seasons,
        episodes: res.data.episodes
      })
    })
    .catch(error => {
      console.log(error)
    })

    http.getWatchlistIds()
      .then(res => {
        this.setState({ films_on_watchlist: res.data.watchlist_ids })
      })
    
    http.getWatchlistSeasonIds()
      .then(res => {
        this.setState({seasons_on_watchlist: res.data.watchlist_ids})
      })

    http.getWatchlistEpisodeIds()
      .then(res => {
        this.setState({episodes_on_watchlist: res.data.watchlist_ids})
      })
  }

  addToWatchlist = (type, id) => {
      var params = {
        "add": true,
        "type": type,
        "id": id
      }

      http.updateWatchlistShows(params)
      .then(res => {
        var new_watchlist_ids = []
        this.setState({on_watchlist: true})
        if(type === "film") {
          new_watchlist_ids = [...this.state.films_on_watchlist]
          this.setState({films_on_watchlist: new_watchlist_ids.concat(id)})
        } else if(type === "season"){
          new_watchlist_ids = [...this.state.seasons_on_watchlist]
          this.setState({seasons_on_watchlist: new_watchlist_ids.concat(id)})
        } else if (type === "episode") {
          new_watchlist_ids = [...this.state.episodes_on_watchlist]
          this.setState({episodes_on_watchlist: new_watchlist_ids.concat(id)})
        }
      })
  }

  removeFromWatchlist = (type, id) => {
    var params = {
      "remove": true,
      "type": type,
      "id": id
    }

    http.updateWatchlistShows(params)
    .then(res => {
      var new_watchlist_ids = []
      var index = -1;
      this.setState({on_watchlist: false})
      if(type === "film") {
        new_watchlist_ids = [...this.state.films_on_watchlist]
        index = new_watchlist_ids.indexOf(id)
        if(index !== -1){
          new_watchlist_ids.splice(index, 1)
          this.setState({films_on_watchlist: new_watchlist_ids})
        }
      } else if(type === "season"){
        new_watchlist_ids = [...this.state.seasons_on_watchlist]
        index = new_watchlist_ids.indexOf(id)
        if(index !== -1){
          new_watchlist_ids.splice(index, 1)
          this.setState({seasons_on_watchlist: new_watchlist_ids})
        }
      } else if (type === "episode") {
        new_watchlist_ids = [...this.state.episodes_on_watchlist]
        index = new_watchlist_ids.indexOf(id)
        if(index !== -1){
          new_watchlist_ids.splice(index, 1)
          this.setState({episodes_on_watchlist: new_watchlist_ids})
        }
      }
    })
  }

  render() {
    const { classes } = this.props;

    return(
      <div className="m-5">
        { this.state.movies.length > 0 && (
          <Card className={`pt-3 pb-3 ${classes.card}`}>
            <Typography variant="h5" align="center" className={classes.title} gutterBottom>
              Movies ({this.state.movies.length}) 
            </Typography>
            <Grid container alignItems="center" direction="column" justify="center">
              <Grid item direction="row" container justify="space-evenly">
                <WatchListGrid 
                  list={this.state.movies} 
                  showWatchListBtn={true} 
                  watchlist_ids={this.state.films_on_watchlist}
                  type="film"
                  subtype="movie"
                  addToWatchlist={this.addToWatchlist}
                  removeFromWatchlist={this.removeFromWatchlist}
                />
              </Grid> 
            </Grid>
          </Card>
          )}

          { this.state.tv_shows.length > 0 && (
          <Card className={`mt-5 pt-3 pb-3 ${classes.card}`}>
            <Typography variant="h5" align="center" className={classes.title} gutterBottom>
              Tv Shows ({this.state.tv_shows.length}) 
            </Typography>
            <Grid container alignItems="center" direction="column" justify="center">
              <Grid item direction="row" container justify="space-evenly">
                <WatchListGrid 
                  list={this.state.tv_shows} 
                  showWatchListBtn={true} 
                  watchlist_ids={this.state.films_on_watchlist}
                  addToWatchlist={this.addToWatchlist}
                  removeFromWatchlist={this.removeFromWatchlist}
                  type="film"
                  subtype="tv_show"
                  />
              </Grid>
            </Grid>
          </Card>
          )}
          
          { this.state.seasons.length > 0 && (
          <Card className={`mt-5 pt-3 pb-3 ${classes.card}`}>
            <Typography variant="h5" align="center" className={classes.title} gutterBottom>
              Seasons ({this.state.seasons.length}) 
            </Typography>
            <Grid item direction="row" container justify="space-evenly" className="mt-5">
              <WatchListGrid 
                list={this.state.seasons} 
                showWatchListBtn={true} 
                seasons_on_watchlist={this.state.seasons_on_watchlist}
                addToWatchlist={this.addToWatchlist}
                removeFromWatchlist={this.removeFromWatchlist}
                type="season"
              />
            </Grid>
          </Card>
          )}

          { this.state.episodes.length > 0 && (
          <Card className={`mt-5 pt-3 pb-3 ${classes.card}`}>
            <Typography variant="h5" align="center" className={classes.title} gutterBottom>
              Episodes ({this.state.episodes.length}) 
            </Typography>
            <Grid item direction="row" container justify="space-evenly" className="mt-5">
              <WatchListGrid 
                list={this.state.episodes} 
                showWatchListBtn={true} 
                type="episode"
                episodes_on_watchlist={this.state.episodes_on_watchlist}
                addToWatchlist={this.addToWatchlist}
                removeFromWatchlist={this.removeFromWatchlist}
              />
            </Grid>
          </Card>
          )}
        
      </div>
    )}
}

Watchlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(watchlist)(Watchlist);
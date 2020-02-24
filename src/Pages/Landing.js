import React, { Component } from "react";
import Search from '../Components/SearchField'
import Grid from '@material-ui/core/Grid';
import FilmCard from '../Components/FilmCard';
import * as http from '../services/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as Auth from '../services/Util';
import AuthDialog from '../Components/AuthDialog';
import history from '../history';
import Typography from '@material-ui/core/Typography';
import { themeColor, buttonTextColor } from '../Assets/styles/theme'

const useStyles = theme => ({
  progressBar: {
    marginTop: "20px",
  },
  title: {
    fontWeight: "bold",
    color: themeColor,
    backgroundColor: buttonTextColor,
  },
});


class Landing extends Component { 
  state = {
    movies: [],
    tv_shows: [],
    searchText: null,
    watchlist_ids: [],
    dialogOpen: false
  }

  setMoviesAndTvShows = (data) => {
    var movies_arr = []
    var tv_shows_arr = []

    data.map(film => {
      if(film.media_type === "Movie"){
        movies_arr.push(film.movie)
      } else {
        tv_shows_arr.push(film.tv_show)
      }
      return null;
    })

    this.setState({
      movies: movies_arr,
      tv_shows: tv_shows_arr
    })
  }

  componentDidMount = () => {
    http.getFilms()
    .then(res => {
      this.setMoviesAndTvShows(res.data)
    })
    .catch(error => {
      console.log(error)
    })

    if (this.props.loginStatus){
      http.getWatchlistIds()
      .then(res => {
        this.setState({ watchlist_ids: res.data.watchlist_ids })
      })
    }
  }

  searchFilms = (data) => {
    http.getFilms(data)
    .then(res => {
      this.setMoviesAndTvShows(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  goToLogin = () => {
    history.push('/login')
    this.setState({dialogOpen: false})
  };

  goToSignup = () => {
    history.push('/signup')
    this.setState({dialogOpen: false})
  };

  addToWatchlist = (type, id) => {
    if(Auth.isSignedIn()){
      var params = {
        "add": true,
        "type": type,
        "id": id
      }

      http.updateWatchlistShows(params)
      .then(res => {
        var new_watchlist_ids = [...this.state.watchlist_ids]
        this.setState({watchlist_ids: new_watchlist_ids.concat(id)})
      })
    } else {
      this.setState({dialogOpen: true})
    }
  }

  removeFromWatchlist = (type, id) => {
    var params = {
      "remove": true,
      "type": type,
      "id": id
    }

    http.updateWatchlistShows(params)
      .then(res => {
        var new_watchlist_ids = [...this.state.watchlist_ids]
        var index = new_watchlist_ids.indexOf(id)
        if(index !== -1){
          new_watchlist_ids.splice(index, 1)
          this.setState({watchlist_ids: new_watchlist_ids})
        }
      })
  }

  handleClose = () => {
    this.setState({dialogOpen: false})
  };

  render() {
    const { classes } = this.props;
    return(
      <div className="mt-4">
        <Grid container alignItems="center" direction="column" justify="center">
          <Grid item justify="center" container xs={5}>
            <Search handleChange={this.searchFilms}/>
          </Grid>

          {this.state.movies.length > 0 &&
            <Grid item direction="column" container justify="center" className="mt-5">
              <Typography variant="h5" className={classes.title} gutterBottom>
                  Movies
              </Typography>
              <Grid item direction="row" container justify="space-evenly">
                {this.state.movies.length > 0 ? this.state.movies.map(movie => 
                  <FilmCard 
                    key={movie.id} 
                    show_detail={movie.show_detail} 
                    film_id={movie.id} 
                    watchlist_ids={this.state.watchlist_ids}
                    addToWatchlist={this.addToWatchlist}
                    removeFromWatchlist={this.removeFromWatchlist}
                    type="movie"/>
                
                )  : (
                  <CircularProgress className="mt-5"/>
                )}
              </Grid>
            </Grid>
            }
            
          {this.state.tv_shows.length > 0 &&
            <Grid item direction="column" container justify="center" className="mt-5">
              <Typography variant="h5" className={classes.title} gutterBottom>
                Tv Shows
              </Typography>
              <Grid item direction="row" container justify="space-evenly">
                {this.state.tv_shows.length > 0 ? this.state.tv_shows.map(tv_show => 
                  <FilmCard 
                    key={tv_show.id} 
                    show_detail={tv_show.show_detail} 
                    film_id={tv_show.id} 
                    watchlist_ids={this.state.watchlist_ids}
                    addToWatchlist={this.addToWatchlist}
                    removeFromWatchlist={this.removeFromWatchlist}
                    type="tv_show"/>
                ) : (
                  <CircularProgress className="mt-5"/>
                )}
              </Grid>
            </Grid>
          }
        </Grid>
        <AuthDialog 
          open={this.state.dialogOpen} 
          goToLogin={this.goToLogin} 
          goToSignup={this.goToSignup} 
          handleClose={this.handleClose}/>
      </div>
    )}
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Landing);
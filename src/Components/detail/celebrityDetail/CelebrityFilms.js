import React from 'react';
import { celebrityFilms } from '../../../Assets/styles/celebrityFilms';
import Card from '@material-ui/core/Card';
import { commonStyles } from '../../../Assets/styles/common'
import Typography from '@material-ui/core/Typography';
import FilmGridList from '../../FilmGridList'

export default function CelebrityFilms(props) {
  const classes = celebrityFilms();
  const common = commonStyles();

  return (
    props.movies && props.movies.length > 0 && (
    <div className={`p-5 ${common.width100}`}> 
      <div className={`${common.width100}`}>
        <Card className={classes.root}>
          <Typography variant="h5" align="center" className={common.title} gutterBottom>
            Movies ({props.movies.length}) 
          </Typography>
          <FilmGridList 
            showWatchListBtn={true} 
            removeFromWatchlist={props.removeFromWatchlist} 
            list={props.movies} 
            addToWatchlist={props.addToWatchlist}
            watchlist_ids={props.watchlist_ids}
            type="film"
            />
        </Card>
      </div>
      { props.tv_shows && props.tv_shows.length > 0 && (
      <div className={`mt-5 ${common.width100}`}>
        <Card className={classes.root}>
          <Typography variant="h5" align="center" className={common.title} gutterBottom>
            Tv Shows ({props.tv_shows.length}) 
          </Typography>
          <FilmGridList 
            list={props.tv_shows} 
            showWatchListBtn={true} 
            removeFromWatchlist={props.removeFromWatchlist}
            addToWatchlist={props.addToWatchlist}
            watchlist_ids={props.watchlist_ids} 
            type="film"
          />
        </Card>
      </div>
      )}
    </div>
    ));
}

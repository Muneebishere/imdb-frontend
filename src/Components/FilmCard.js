import React from 'react';
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReadonlyRating from './ReadonlyRating'
import * as urls from '../urls';
import { filmCard } from '../Assets/styles/filmCard';
import { commonStyles } from '../Assets/styles/common';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function FilmCard(props) {
  const classes = filmCard();
  const common = commonStyles();
  const history = useHistory();
  const release_date = new Date(props.show_detail.release_date)

  function handleClick() {
    if(props.type === "movie"){
      history.push("/movies/" + props.film_id);
    } else if (props.type === "tv_show") {
      history.push("/tv_shows/" + props.film_id);
    }
  }

  function existsInWatchlist(id) {
    return (props.watchlist_ids.indexOf(id) > -1)
  }

  return (
    <div className={classes.margin}>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
            <CardMedia
              className={classes.media}
              image={urls.BASE_URL + props.show_detail.poster}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.content}>
              <Typography align="center" component="h2" className={`${classes.title} ${common.wrapText}`}>
                  {props.show_detail.title} 
              </Typography>
              <Typography align="center" gutterBottom component="h3" className={`${classes.title} ${common.wrapText}`}>
                <span variant="contained" color="primary" className={classes.yearRelased}>({release_date.getFullYear()})</span>
              </Typography>
              <ReadonlyRating rating={props.show_detail.overall_rating}/>
            </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container justify="center" alignItems="center">
              { existsInWatchlist(props.film_id) ? (
                  <Button size="small" fullWidth color="primary" onClick={() => props.removeFromWatchlist("Film", props.film_id)} className={classes.removeWatchlistBtn}>
                    <CheckCircleIcon fontSize='small'/> Added To Watchlist
                  </Button>
                  ) : (
                  <Button size="small" fullWidth color="primary" onClick={() => props.addToWatchlist("Film", props.film_id)} className={classes.watchlistButton}>
                    + Watchlist
                  </Button>
                )
              }
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
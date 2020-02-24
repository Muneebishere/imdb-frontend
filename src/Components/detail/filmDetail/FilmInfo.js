import React from 'react'
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ContentRatingAndDuration from './ContentRating';
import DetailRating from './DetailRating'
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { format } from "date-fns";
import * as Utility from '../../../services/Util';
import { filmInfo } from '../../../Assets/styles/filmInfo'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function FilmCardDetail(props){
  const classes = filmInfo();
  const { show_detail, type } = props
  const release_date = new Date(props.show_detail.release_date)

  function getGenres() {
    var genre_string = ''
    props.genres.map((genre) => {
      genre_string += genre.name
      genre_string += ', '
      return null;
    })
    return genre_string.slice(0, -2)
  }

  return(
    <Grid item>
      <Grid container justify="space-between" alignItems="stretch" direction="column">
        <CardContent className={classes.content}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom variant="h5" component="h4" className={classes.title}>
              {show_detail.title}
            </Typography>
            <span color="primary" className={classes.yearRelased} >({release_date.getFullYear()})</span>
          </Grid>
          <ContentRatingAndDuration content_rating={Utility.contentRatingMapping(props.content_rating)} duration={Utility.getHoursAndMinutes(show_detail.duration)}/>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.genres}>{getGenres()}</Typography>
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.releaseDateHeading}>Released:</Typography>
            <Typography gutterBottom componen ="h2" className={classes.releaseDate}>{format(release_date, "dd MMMM, yyyy")}</Typography>
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.releaseDateHeading}>Reviews:</Typography>
            <Typography gutterBottom componen ="h2" className={classes.releaseDate}>{props.reviewsCount}</Typography>
          </Grid>
          <DetailRating rating={show_detail.overall_rating}/>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            { (type === "season" || type === "episode")  && 
              <div>
                <ButtonGroup size="small" aria-label="small outlined button group" className={classes.btnGroup}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.nav}
                    onClick={() => props.prevClickHandle()}
                    startIcon={<ChevronLeftIcon />}
                    disabled={!props.prevPresent}
                  >
                    Prev
                  </Button>

                  <Button className={classes.typeBtn}>{type + " " + props.number}</Button>
                  <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => props.nextClickHandle()}
                  className={classes.nav}
                  endIcon={<ChevronRightIcon />}
                  disabled={!props.nextPresent}
                >
                  Next
                </Button>
                </ButtonGroup>
              </div>
            }
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Button size="small" variant="outlined" className={classes.trailerButton}>Watch Trailer</Button>
          </Grid>
        </CardContent>

        <CardActions>
            {!props.onWatchlist ? (
              <Button size="small" onClick={() => props.addToWatchlist(props.type, props.film_id)} fullWidth color="primary" className={classes.watchlistButton}>
                + Add to Watchlist
              </Button>) : (
              <Button size="small" fullWidth onClick={() => props.removeFromWatchlist(props.type, props.film_id)} color="primary" className={classes.removeWatchlistBtn}>
                <CheckCircleIcon fontSize='small'/> Added 
              </Button>)
            }
            
            
        </CardActions>
      </Grid>
    </Grid>
  );
}
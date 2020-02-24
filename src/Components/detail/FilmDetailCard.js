import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import * as urls from '../../urls'
import { detailCard } from '../../Assets/styles/detailCard'
import FilmInfo from './filmDetail/FilmInfo'

export default function Detail(props) {
  const classes = detailCard();
  const { show_detail, type } = props

  return (
    <div className="mr-5 mb-5">
      <Card className={classes.card}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={urls.BASE_URL + show_detail.poster}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Grid>

          <Grid item>
            <FilmInfo 
              show_detail={show_detail} 
              genres={props.genres} 
              reviewsCount={props.reviewsCount}
              type={type}
              nextClickHandle={props.nextClickHandle}
              prevClickHandle={props.prevClickHandle}
              nextPresent={props.nextPresent}
              prevPresent={props.prevPresent}
              onWatchlist={props.on_watchlist}
              addToWatchlist={props.addToWatchlist}
              removeFromWatchlist={props.removeFromWatchlist}
              film_id={props.film_id}
              number={props.number}
              seasons_on_watchlist={props.seasons_on_watchlist}
              epsiodes_on_watchlist={props.epsiodes_on_watchlist}
              />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
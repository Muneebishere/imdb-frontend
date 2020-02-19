import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { detailRating } from '../../../Assets/styles/detailRating'

export default function ReadOnlyRating(props){
  const classes = detailRating();

  return(
    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
      <Typography gutterBottom component="h2" className={classes.ratingHeading}>Rating: </Typography>
      <Typography gutterBottom component="h2" className={classes.ratingText}>{props.rating} </Typography>
      <Typography gutterBottom component="h2" className={classes.ratingTotal}>/10</Typography>
      <Box component="fieldset" className={classes.rating}>
        <Rating name="half-rating" size="medium" value={(props.rating/2)} readOnly/>
      </Box>
    </Grid>
  )
}
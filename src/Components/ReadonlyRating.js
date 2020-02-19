import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { readOnlyRating } from '../Assets/styles/readOnlyRating'

export default function ReadOnlyRating(props){
  const classes = readOnlyRating();

  return(
    <Grid container justify="center" alignItems="center" direction="column">
      <div> 
      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating}>
        <Rating name="half-rating" value={(props.rating/2)} readOnly/>
      </Box></div>
      <div className={classes.ratingText}>
        {props.rating}
      </div>
    </Grid>
  )
}
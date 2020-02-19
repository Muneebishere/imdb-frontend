import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { watchListNavButton } from '../Assets/styles/watchListNavButton'

export default function WatchlistNavButton(props) {
  const classes = watchListNavButton();
  const {text} = props

  return (
    <Grid container alignItems="center" className={classes.root}>
        <Typography component="h2" className={classes.text}>{text}</Typography>
    </Grid>
    
  );
}

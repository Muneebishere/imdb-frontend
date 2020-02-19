import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { highlightedText } from '../Assets/styles/highlightedText'

export default function VerticalDividers(props) {
  const classes = highlightedText();
  const {text} = props

  return (
    <Grid container alignItems="center" className={classes.root}>
        <Typography component="h2" className={classes.contentRating}>{text}</Typography>
    </Grid>
    
  );
}

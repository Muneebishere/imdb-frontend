import React from 'react';
import { commonStyles } from "../../../Assets/styles/common";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HighlightedText from '../../HighlightedText'

export default (props) => {
  const classes = commonStyles();

  return (
    <Grid container alignItems="center">
      <HighlightedText text={props.content_rating} />
      <Typography component="h2" className={`${classes.duration}`}>{props.duration}</Typography>
    </Grid>
  );
}
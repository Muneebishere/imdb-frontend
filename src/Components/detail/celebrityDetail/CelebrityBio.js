import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { celebrityBio } from '../../../Assets/styles/celebrityBio'

export default function CelebrityBio(props){
  const classes = celebrityBio();
  const { celebrity } = props;

  return(
    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
      <Typography variant="h6" className={classes.title} gutterBottom>
        Biography
      </Typography>
      <Typography paragraph={true} align="left" gutterBottom component="h2">
        {celebrity.biography}
      </Typography>

      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography gutterBottom component="h2" className={classes.castHeading}>Birth Name:</Typography>
        <Typography gutterBottom componen ="h2" className={classes.castNames}>{celebrity.birth_name}</Typography>
      </Grid>

      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography gutterBottom component="h2" className={classes.castHeading}>Height:</Typography>
        <Typography gutterBottom componen ="h2" className={classes.castNames}>{celebrity.height}m</Typography>
      </Grid>

      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography gutterBottom component="h2" className={classes.castHeading}>Upcoming movie:</Typography>
        <Typography gutterBottom componen ="h2" className={classes.castNames}></Typography>
      </Grid>
    </Grid>
  )
}
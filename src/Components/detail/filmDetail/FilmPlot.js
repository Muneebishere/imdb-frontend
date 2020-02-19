import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { filmPlot } from '../../../Assets/styles/filmPlot'

export default function FilmPlot(props){
  const classes = filmPlot();
  const { plot } = props;

  function getCelebrityNames(role_name){
    var name_string = ''
    props.roles.map((role, index) => {
      if(role.role_type === role_name){
        name_string += role.celebrity.full_name
        name_string += ', '
      }
      return null;
    })
    return name_string.slice(0, -2)
  }

  return(
    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
      <Typography variant="h6" className={classes.title} gutterBottom>
        Plot 
      </Typography>
      <Typography paragraph={true} align="left" gutterBottom component="h2">
        {plot}
      </Typography>

      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography gutterBottom component="h2" className={classes.castHeading}>Director:</Typography>
        <Typography gutterBottom componen ="h2" className={classes.castNames}>{getCelebrityNames('director')}</Typography>
      </Grid>

      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography gutterBottom component="h2" className={classes.castHeading}>Writers:</Typography>
        <Typography gutterBottom componen ="h2" className={classes.castNames}>{getCelebrityNames('writer')}</Typography>
      </Grid>

      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography gutterBottom component="h2" className={classes.castHeading}>Stars:</Typography>
        <Typography gutterBottom componen ="h2" className={classes.castNames}>{getCelebrityNames('cast')}</Typography>
      </Grid>
    </Grid>
  )
}
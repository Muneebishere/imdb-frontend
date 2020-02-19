import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HighlightedText from '../../HighlightedText';
import { celebrityCardDetail } from '../../../Assets/styles/celebrityCardDetail';
import { format } from "date-fns";

export default function FilmCardDetail(props){
  const classes = celebrityCardDetail();
  const { celebrity } = props
  const birth_date = new Date(celebrity.birth_date)

  return(
    <Grid item>
      <Grid container justify="space-between" alignItems="stretch" direction="column">
        <CardContent className={classes.content}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom variant="h5" component="h4" className={classes.title}>
              {celebrity.full_name}
            </Typography>
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.genres}>Producer, Actor, Director</Typography>
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.releaseDateHeading}>Born:</Typography>
            <Typography gutterBottom componen ="h2" className={classes.releaseDate}>{format(birth_date, "dd MMMM, yyyy")}</Typography>
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.releaseDateHeading}>Birthplace:</Typography>
            <Typography gutterBottom componen ="h2" className={classes.releaseDate}> New York, USA</Typography>
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.releaseDateHeading}>Star Sign:</Typography>
            <Typography gutterBottom componen ="h2" className={classes.releaseDate}>Scorpio</Typography>
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Typography gutterBottom component="h2" className={classes.releaseDateHeading}>Credits:</Typography>
            <Typography gutterBottom componen ="h2" className={classes.releaseDate}>65</Typography>
          </Grid>
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            <div className="pt-1 pb-2">
                <HighlightedText text="1 Oscar Win"/>
            </div>
            <Typography align="center" component="h2" className={classes.releaseDateHeading}>Another 25 Wins & 50 Nominations</Typography>
          </Grid>

        </CardContent>
      </Grid>
    </Grid>
  );
}
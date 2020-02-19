import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import * as urls from '../../urls'
import CelebrityDetail from './celebrityDetail/CelebrityDetail'
import { detailCard } from '../../Assets/styles/detailCard'

export default function Detail(props) {
  const classes = detailCard();
  const { celebrity } = props

  return (
    <div className="ml-5 mr-5">
      <Card className={classes.card}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={urls.BASE_URL + celebrity.display_picture}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Grid>

          <Grid item>
            <CelebrityDetail celebrity={celebrity}/>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
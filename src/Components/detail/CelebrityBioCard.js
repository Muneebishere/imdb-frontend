import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { descriptionCard } from '../../Assets/styles/descriptionCard'
import CelebrityBio from './celebrityDetail/CelebrityBio'

export default function OutlinedCard(props) {
  const classes = descriptionCard();

  return (
    <Card className={classes.root}>
      <CardContent>
        <CelebrityBio celebrity={props.celebrity}/>
      </CardContent>
    </Card>
  );
}

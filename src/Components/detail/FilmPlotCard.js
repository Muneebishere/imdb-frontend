import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { descriptionCard } from '../../Assets/styles/descriptionCard'
import FilmPlot from './filmDetail/FilmPlot'

export default function OutlinedCard(props) {
  const classes = descriptionCard();

  return (
    <Card className={`mb-5 ${classes.root}`}>
      <CardContent>
        <FilmPlot roles={props.roles} plot={props.plot}/>
      </CardContent>
    </Card>
  );
}

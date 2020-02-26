import React from 'react';
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as urls from '../urls';
import { filmCard } from '../Assets/styles/filmCard';
import { commonStyles } from '../Assets/styles/common';
import { format } from "date-fns";

export default function CelebrityCard(props) {
  const classes = filmCard();
  const common = commonStyles();
  const history = useHistory();

  function handleClick() {
    history.push("/celebrities/" + props.celebrity.id);
  }

  function getOccupations() {
    var occ_string = ''
    props.celebrity.occupations.map((title) => {
      if(title === "cast") title = "actor" 
      occ_string += title
      occ_string += ', '
      return null;
    })
    return occ_string.slice(0, -2)
  }

  return (
    <div className={classes.margin}>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
            <CardMedia
              className={classes.media}
              image={urls.BASE_URL + props.celebrity.display_picture}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.content}>
              <Typography align="center" component="h2" className={`${classes.title} ${common.wrapText}`}>
                  {props.celebrity.full_name} 
              </Typography>
              <Typography align="center" component="h3" className={`${classes.title} ${common.capitalize} ${common.wrapText}`}>
                <span variant="contained" color="primary" className={classes.yearRelased}>{getOccupations()}</span>
              </Typography>
              <Typography align="center" gutterBottom component="h3" className={`${classes.title2} ${common.wrapText}`}>
                <span variant="contained" color="primary" className={classes.title2}>Credits: {props.celebrity.credits}</span>
              </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
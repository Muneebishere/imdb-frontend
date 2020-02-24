import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import { reviewList } from '../../../Assets/styles/reviewList';
import Card from '@material-ui/core/Card';

export default function AlignItemsList(props) {
  const classes = reviewList();

  return (
    <div className={`mb-5 ${classes.container}`}>
    <Card className={classes.root}>
      <List subheader={<ListSubheader className={classes.subHeading}>Reviews ({props.reviews.length})</ListSubheader>} className={classes.root}>
        {
          props.reviews.map(review => (
            <div key={review.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={review.user.name} src={review.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={review.user.name + ' - ' +  review.heading}
                  className={classes.reviewHeading}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        paragraph={true} 
                        align="left"
                        color="textPrimary"
                      >
                        {review.body}
                      </Typography>
                    </React.Fragment>
                  }
                />
                </ListItem>
            <Divider variant="inset" component="li" />
            </div>
          ))
        }
      </List>
    </Card>
    </div>
  );
}

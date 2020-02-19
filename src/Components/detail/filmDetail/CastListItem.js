import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import * as urls from '../../../urls';
import { castList } from '../../../Assets/styles/castList';

export default function CastListItem(props) {
  const classes = castList();

  function handleClick() {
    props.itemClick(props.role.celebrity.id)
  }

  return (
    <ListItem button alignItems="flex-start" onClick={handleClick}>
        <ListItemAvatar>
        <Avatar className={classes.large} alt="Remy Sharp" src={urls.BASE_URL + props.role.celebrity_display_picture} />
        </ListItemAvatar>
        <ListItemText
          primary={props.role.celebrity.full_name}
          className={classes.actorName}
          secondary={
            <React.Fragment>
            As
            <Typography
                component="span"
                variant="body2"
                className={classes.characterName}
            >
                {props.role.character_name}
            </Typography>
            </React.Fragment>
        }
        />
    </ListItem>
  );
}

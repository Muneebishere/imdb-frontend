import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import * as urls from '../../urls';
import { actorList } from '../../Assets/styles/actorList'

export default function AlignItemsList(props) {
  const classes = actorList();

  function getActorList() {
    var castArr = [];
    props.roles.map(role => {
      if(role.role_type === 'cast'){
        castArr.push(role)
      }
      return null;
    })
    console.log(castArr)
    return castArr;
  }

  return (
    <div className="m-5">
    <List subheader={<ListSubheader className={classes.subHeading}>Cast ({getActorList().length})</ListSubheader>} className={classes.root}>
      {
        getActorList().map(role => (
          <div key={role.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar className={classes.large} alt="Remy Sharp" src={urls.BASE_URL + role.celebrity_display_picture} />
            </ListItemAvatar>
            <ListItemText
              primary={role.celebrity.full_name}
              className={classes.actorName}
              secondary={
                <React.Fragment>
                  As
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.characterName}
                  >
                    {role.character_name}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li"/>
          </div>
        )
      )}
    </List>
    </div>
  );
}

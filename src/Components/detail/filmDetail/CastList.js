import React from 'react';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { castList } from '../../../Assets/styles/castList';
import Card from '@material-ui/core/Card';
import CastListItem from './CastListItem'

export default function AlignItemsList(props) {
  const classes = castList();
  const history = useHistory();

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

  function handleClick(id) {
    history.push("/celebrities/" + id);
  }

  return (
    <div className="m-5">
    <Card className={classes.root}>
      <List subheader={<ListSubheader className={classes.subHeading}>Cast ({getActorList().length})</ListSubheader>} className={classes.root}>
        {
          getActorList().map(role => (
            <div key={role.celebrity.id}>
              <CastListItem role={role} itemClick={handleClick}/>
            <Divider variant="inset" component="li"/>
            </div>
          )
        )}
      </List>
    </Card>
    </div>
  );
}

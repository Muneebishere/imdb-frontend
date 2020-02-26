import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { boxShadow, themeColor } from '../Assets/styles/theme';
import { withStyles } from '@material-ui/styles';

const useStyles = theme => ({
  root: {
    boxShadow: boxShadow,
  },
  details: {
    display: 'flex'

  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 110,
    flexShrink: 0,
    flexGrow: 0,
    marginRight: "5px"
  },
  progress: {
    marginTop: "10px"
  },
  uploadButton: {
    marginRight: "10px",
    color: themeColor
  },
  title: {
    color: '#757575',
  },
  title2: {
    color: themeColor,
    fontWeight: "bold"
  },
  count: {
    fontSize: "14px",
    color: '#757575',
  },
  label: {
    marginBottom: "0px"
  }
});

class AccountProfile extends Component {

  constructor(props){
    super(props)
    this.state = {
      avatar: "",
      avatar_url: "",
    }
  }  

  render(){
    const { classes, className } = this.props;
    const { user } = this.props;

    return (
      <Card
        className={clsx(classes.root, className)}
      >
        <CardContent>
          <div className={classes.details}>
            <div>
              <Typography
                variant="h4"
                className={classes.title}
              >
                {user.first_name + " " + user.last_name}
              </Typography>
              <Typography
                className={classes.title2}
                color="textSecondary"
                variant="body2"
                align="left"
              >
                Watchlist Shows: <span className={classes.count}>{user.watchlist_shows_count}</span>
              </Typography>
              <Typography
                className={classes.title2}
                color="textSecondary"
                variant="body2"
                align="left"
              >
                Reviews: <span className={classes.count}>{user.reviews_count}</span>
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src={this.props.avatar_url ? this.props.avatar_url : '/images/avatars/avatar_11.png'}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="user-avatar"
            multiple
            type="file"
            onChange={(event) => {
              this.props.handleFileUpload(event)
              event.target.value=null
            }}
            name="avatar"
          />
          <label htmlFor="user-avatar" className={classes.label}>
            <Button
              className={classes.uploadButton}
              color="primary"
              component="span" 
            >
              Upload picture
            </Button>
          </label>
          <Button variant="text" onClick={this.props.handleRemoveAvatar}>Remove picture</Button>
        </CardActions>
      </Card>
    );
  }
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(AccountProfile);
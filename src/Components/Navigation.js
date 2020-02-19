import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UserNavIcon from './UserNavIcon';
import * as http from '../services/index';
import Link from '@material-ui/core/Link';
import { navigation } from '../Assets/styles/navigation';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import MovieIcon from '@material-ui/icons/Movie';
import ListIcon from '@material-ui/icons/List';
import StarsIcon from '@material-ui/icons/Stars';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import history from '../history';
import WatchListNavButton from './watchListNavButton'

class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      left: false,
      watchlistCount: this.props.watchlistCount,
    }
  }

  handleLogout = () => {
    http.logoutUser()
    .then(_res => {
      this.props.logoutHandle()
      history.push("/")
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  render(){
    const { classes, loginStatus } = this.props;
    let button;

    if(!loginStatus) {
      button = <Button href="/login" color="inherit" className={classes.loginButton}>Login</Button>
    } else {
      button = (<UserNavIcon handleLogout={this.handleLogout}/>)
    }

    const toggleDrawer = (side, open) => event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ ...this.state, [side]: open });
    };
  
    const sideList = side => (
      <div
        className={classes.sidelist}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          <ListItem button key={0}>
            <ListItemIcon>{<HomeIcon />}</ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button key={1}>
            <ListItemIcon>{<LocalMoviesIcon />}</ListItemIcon>
            <ListItemText primary={'Movies'} />
          </ListItem>
          <ListItem button key={2}>
            <ListItemIcon>{<MovieIcon />}</ListItemIcon>
            <ListItemText primary={'Tv Shows'} />
          </ListItem>
          <ListItem button key={3}>
            <ListItemIcon>{<ListIcon />}</ListItemIcon>
            <ListItemText primary={'Your Watchlist'} />
          </ListItem>
          <ListItem button key={4}>
            <ListItemIcon>{<StarsIcon />}</ListItemIcon>
            <ListItemText primary={'Celebrities'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={5}>
            <ListItemIcon>{<PersonIcon />}</ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>
          <ListItem button key={6}>
            <ListItemIcon>{!this.state.loginStatus ? <LockOpenIcon /> : <ExitToAppIcon />}</ListItemIcon>
            <ListItemText primary={!this.state.loginStatus ? 'Login' : 'Logout'} />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <SwipeableDrawer
          open={this.state.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {sideList('left')}
        </SwipeableDrawer>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar variant="dense">
            <Grid container justify="space-between">
              <Grid item>
                <div className="row">
                  <IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                    <MenuIcon />
                  </IconButton>
                  <Link 
                    href="/" 
                    underline="none" 
                    color="inherit" 
                    className={classes.linkStyle}>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                      IMDB
                    </Typography>
                  </Link>
                </div>
              </Grid>
              <Grid item>
                <div className="row">
                  <Button color="inherit" className={classes.watchListButton} href="/watchlist" >
                    Watchlist <WatchListNavButton text={this.state.watchlistCount}/> 
                  </Button>
                  <Divider variant="middle" className={classes.divider} orientation="vertical" />
                  {button}
                </div>
              </Grid>
            </Grid>
          </Toolbar>
          
        </AppBar>
      </div>  
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(navigation)(Navigation);

import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation'
import { Router, Route, Switch } from "react-router-dom";
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import * as Auth from './services/Util'
import CreateMovies from './Pages/CreateMovies'
import FilmDetail from './Pages/FilmDetail'
import CelebrityDetail from './Pages/CelebrityDetail'
import Watchlist from './Pages/Watchlist'
import grey from '@material-ui/core/colors/grey';
import history from './history';
import * as http from './services/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

const useStyles = theme => ({
});

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      loginStatus: Auth.isSignedIn(),
      watchListCount: '+'
    }
  }

  handleLogout = () => {
    this.setState({
      loginStatus: false,
      watchListCount: '+'
    })
    history.push("/")
  }

  handleLogin = () => {
    this.setState({
      loginStatus: true,
    })

    http.getWatchlistCount()
    .then(res => {
      this.setState({
        watchListCount: res.data.count,
      })
      history.push("/")
    })
  }

  render(){
    const {classes} = this.props;
    return (
      <div className="App">
        <Router history={history}>
          <Navigation logoutHandle={this.handleLogout} loginStatus={this.state.loginStatus} watchlistCount={this.state.watchListCount}/>
          <Switch>
            <Route exact path="/" component={() => <Landing loginStatus={this.state.loginStatus}/>}/>
            <Route path="/login" component={() => <Login loginHandle={this.handleLogin}/>} />
            <Route path="/create_movies" component={CreateMovies}/>
            <Route path="/movies/:id" component={FilmDetail}/>
            <Route path="/tv_shows/:tv_show_id/seasons/:season_id/episodes/:id" component={withRouter(FilmDetail)}/>
            <Route exact path="/tv_shows/:tv_show_id/seasons/:id" component={withRouter(FilmDetail)}/>
            <Route exact path="/tv_shows/:id" component={withRouter(FilmDetail)}/>
            <Route path="/celebrities/:id" component={CelebrityDetail}/>
            <Route path="/watchlist" component={Watchlist}/>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(App);

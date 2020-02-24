import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation'
import { Router, Route, Switch } from "react-router-dom";
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import CreateMovies from './Pages/CreateMovies'
import FilmDetail from './Pages/FilmDetail'
import CelebrityDetail from './Pages/CelebrityDetail'
import Watchlist from './Pages/Watchlist'
import SignUp from './Pages/Signup'
import history from './history';
import * as http from './services/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = theme => ({
});

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      isSignedIn: false,
      watchListCount: '+',
      user: {}
    }
  }

  componentDidMount() {
    http.authenticateTokens()
    .then(res => {
      this.setState({
        user: res.data.data,
        isLoading: false,
        isSignedIn: true
      })

      http.getWatchlistCount()
      .then(response => {
        this.setState({
          watchListCount: response.data.count,
          isSignedIn: true,
          isLoading: false,
          user: res.data.data,
        })
      })
    })
    .catch(error => {
      this.setState({
        user: {},
        isLoading: false,
        isSignedIn: false
      })
    })
  }

  handleLogout = () => {
    this.setState({
      watchListCount: '+',
      isLoading: false,
      isSignedIn: false,
      user: {},
    })
    history.push("/")
  }

  handleLogin = (data) => {
    http.getWatchlistCount()
    .then(res => {
      this.setState({
        watchListCount: res.data.count,
        isSignedIn: true,
        isLoading: false,
        user: data.data.data
      })
      history.push("/")
    })
  }

  render(){
    return (
      <div className="App">
        { this.state.isLoading ? (
          <CircularProgress />
        ) : (
        <Router history={history}>
          <Navigation user={this.state.user} logoutHandle={this.handleLogout} loginStatus={this.state.isSignedIn} watchlistCount={this.state.watchListCount}/>
          <Switch>
            <Route exact path="/" component={() => <Landing loginStatus={this.state.isSignedIn}/>}/>
            <Route path="/login" component={this.state.isSignedIn ? () => <Landing loginStatus={true}/> : () => <Login loginHandle={this.handleLogin}/>} />
            <Route path="/signup" component={this.state.isSignedIn ? () => <Landing loginStatus={true}/> : () => <SignUp loginHandle={this.handleLogin}/>} />
            <Route path="/create_movies" component={CreateMovies}/>
            <Route path="/movies/:id" component={() => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route path="/tv_shows/:tv_show_id/seasons/:season_id/episodes/:id" component={ () => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route exact path="/tv_shows/:tv_show_id/seasons/:id" component={ () => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route exact path="/tv_shows/:id" component={ () => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route path="/celebrities/:id" component={() => <CelebrityDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route path="/watchlist" component={this.state.isSignedIn ? () => <Watchlist watchlistCount={this.state.watchListCount}/> : () => <Login loginHandle={this.handleLogin}/>}/>
          </Switch>
        </Router>
        )}
      </div>
    );
  }
  
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(App);

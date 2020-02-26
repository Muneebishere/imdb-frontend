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
import Celebrities from './Pages/Celebrities';
import AccountProfile from './Pages/Profile';
import * as urls from './urls';
import { themeColor } from './Assets/styles/theme';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = theme => ({
  loader: {
    marginTop: "20%",
    color: themeColor
  }
});

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      isSignedIn: false,
      watchListCount: '+',
      user: {},
      tab_value: 0,
      avatar: "",
      avatar_url: "",
      openSnackBar: false
    }
  }

  handleChange = (event, newValue) => {
    this.setState({tab_value: newValue})
  };

  changeTabValue = index => {
    history.push("/")
    this.setState({tab_value: index})
  }

  handleChangeIndex = index => {
    this.setState({tab_value: index})
  };

  componentDidMount() {
    http.authenticateTokens()
    .then(res => {

      http.getUserData()
      .then(res => {
        this.setState({
          user: res.data,
          watchListCount: res.data.watchlist_shows_count,
          isLoading: false,
          isSignedIn: true,
          avatar: res.data.avatar,
          avatar_url: urls.BASE_URL + res.data.avatar
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
    http.getUserData()
    .then(res => {
      this.setState({
        watchListCount: res.data.watchlist_shows_count,
        user: res.data,
        isLoading: false,
        isSignedIn: true,
        avatar: res.data.avatar,
        avatar_url: urls.BASE_URL + res.data.avatar
      })
    })
    history.push("/")
  }

  fileUpload = e => {
    e.persist();
    const file = e.target.files[0]
    const data = new FormData()
    data.append("avatar", e.target.files[0])

    http.updateUserAvatar(data)
    .then(res => {
      console.log(res)
      this.setState({
        user: res.data,
        avatar: file,
        avatar_url: URL.createObjectURL(file)
      })
    })
  }

  removeAvatar = () => {
    http.removeUserAvatar()
    .then(res => {
      this.setState({
        avatar: "",
        avatar_url: ""
      })
    })
  }

  updateUser = (data) => {
    this.setState({
      user: data,
      openSnackBar: true
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({openSnackBar: false})
  };

  render(){
    const { classes } = this.props;
    return (
      <div className="App">
        <Snackbar open={this.state.openSnackBar} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Successfully Updated!
          </Alert>
        </Snackbar>
        { this.state.isLoading ? (
          <CircularProgress className={classes.loader}/>
        ) : (
        <Router history={history}>
          <Navigation 
            user={this.state.user} 
            logoutHandle={this.handleLogout} 
            loginStatus={this.state.isSignedIn} 
            watchlistCount={this.state.watchListCount}
            handleTabValueChange={this.changeTabValue}/>
          <Switch>
            <Route exact path="/" 
              component={() => 
                <Landing 
                  loginStatus={this.state.isSignedIn} 
                  tabValue={this.state.tab_value}
                  handleChangeIndex={this.handleChangeIndex}
                  handleTabValueChange={this.handleChange}
                  />}
                />
            <Route path="/login" component={this.state.isSignedIn ? () => <Landing loginStatus={true}/> : () => <Login loginHandle={this.handleLogin}/>} />
            <Route path="/signup" component={this.state.isSignedIn ? () => <Landing loginStatus={true}/> : () => <SignUp loginHandle={this.handleLogin}/>} />
            <Route path="/create_movies" component={CreateMovies}/>
            <Route path="/movies/:id" component={() => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route path="/tv_shows/:tv_show_id/seasons/:season_id/episodes/:id" component={ () => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route exact path="/tv_shows/:tv_show_id/seasons/:id" component={ () => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route exact path="/tv_shows/:id" component={ () => <FilmDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route path="/celebrities/:id" component={() => <CelebrityDetail loginStatus={this.state.isSignedIn}/>}/>
            <Route exact path="/celebrities" component={() => <Celebrities/>}/>
            <Route exact path="/profile" component={this.state.isSignedIn ? () => 
              <AccountProfile 
                avatar={this.state.avatar} 
                avatar_url={this.state.avatar_url} 
                handleFileUpload={this.fileUpload} 
                user={this.state.user}
                handleUpdateUser={this.updateUser}
                handleRemoveAvatar={this.removeAvatar}/> : () => 
                  <Login loginHandle={this.handleLogin}/>} />
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

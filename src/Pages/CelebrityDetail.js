import React, {Component} from 'react'
import CelebrityDetailContainer from '../Components/detail/CelebrityDetailCard'
import Grid from '@material-ui/core/Grid'
import CelebrityBioCard from '../Components/detail/CelebrityBioCard'
import * as http from '../services/index';
import CelebrityFilms from '../Components/detail/celebrityDetail/CelebrityFilms';
import history from '../history';
import AuthDialog from '../Components/AuthDialog';
import { withRouter } from "react-router-dom";

class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      celebrity: null,
      dialogOpen: false,
      watchlist_ids: [],
    }
  }

  componentDidMount = () => {
    console.log(this.props.match.params.id)
    http.getCelebrityDetails(this.props.match.params.id)
    .then(res => {
      console.log(res)
      this.setState({celebrity: res.data})
    })

    if (this.props.loginStatus){
      http.getWatchlistIds()
      .then(res => {
        this.setState({ watchlist_ids: res.data.watchlist_ids })
      })
    }
  }

  goToLogin = () => {
    history.push('/login')
    this.setState({dialogOpen: false})
  };

  goToSignup = () => {
    history.push("/signup")
    this.setState({dialogOpen: false})
  };

  addToWatchlist = (type, id) => {
    if(this.props.loginStatus){
      var params = {
        "add": true,
        "type": type,
        "id": id
      }

      http.updateWatchlistShows(params)
      .then(res => {
        var new_watchlist_ids = [...this.state.watchlist_ids]
        this.setState({watchlist_ids: new_watchlist_ids.concat(id)})
      })
    } else {
      this.setState({dialogOpen: true})
    }
  }

  removeFromWatchlist = (type, id) => {
    var params = {
      "remove": true,
      "type": type,
      "id": id
    }

    http.updateWatchlistShows(params)
      .then(res => {
        var new_watchlist_ids = [...this.state.watchlist_ids]
        var index = new_watchlist_ids.indexOf(id)
        if(index !== -1){
          new_watchlist_ids.splice(index, 1)
          this.setState({watchlist_ids: new_watchlist_ids})
        }
      })
  }

  handleClose = () => {
    this.setState({dialogOpen: false})
  };

  render(){
    if(this.state.celebrity){
      const celebrity = this.state.celebrity
      return(
        <div>        
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <CelebrityDetailContainer 
              celebrity={celebrity}/>
            <CelebrityBioCard celebrity={celebrity}/>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <CelebrityFilms 
              showWatchListBtn={true} 
              movies={celebrity.movies} 
              tv_shows={celebrity.tv_shows}
              watchlist_ids={this.state.watchlist_ids}
              addToWatchlist={this.addToWatchlist}
              removeFromWatchlist={this.removeFromWatchlist}
            />
          </Grid>
          <AuthDialog 
            open={this.state.dialogOpen} 
            goToLogin={this.goToLogin} 
            goToSignup={this.goToSignup} 
            handleClose={this.handleClose}/>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

export default withRouter(Detail);

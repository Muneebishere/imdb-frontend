import React, {Component} from 'react'
import FilmDetailCard from '../Components/detail/FilmDetailCard'
import Grid from '@material-ui/core/Grid'
import DescriptionCard from '../Components/detail/FilmPlotCard'
import CastList from '../Components/detail/filmDetail/CastList'
import ReviewList from '../Components/detail/filmDetail/ReviewList'
import * as http from '../services/index'
import SeasonGrid from '../Components/FilmGridList'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { filmDetail } from '../Assets/styles/filmDetail';
import Typography from '@material-ui/core/Typography';
import AuthDialog from '../Components/AuthDialog';
import history from '../history';
import { withRouter } from "react-router-dom";

class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      film: null,
      type: '',
      on_watchlist: false,
      dialogOpen: false,
      seasons_on_watchlist: [],
      episodes_on_watchlist: []
    }
  }

  componentDidMount = () => {
    if (this.props.location.pathname.includes("episodes")){
      const {tv_show_id, season_id, id} = this.props.match.params;
      http.getEpisodeDetails(tv_show_id, season_id, id)
      .then(res => {
        console.log(res)
        this.setState({
          film: res.data.episode,
          on_watchlist: res.data.on_watchlist,
          type: "episode"
        })
      })
    } else if (this.props.location.pathname.includes("seasons")){
      const {tv_show_id, id} = this.props.match.params;
      http.getSeasonDetails(tv_show_id, id)
      .then(res => {
        console.log(res)
        this.setState({
          film: res.data.season,
          on_watchlist: res.data.on_watchlist,
          type: "season"
        })
      })

      if(this.props.loginStatus){
        http.getWatchlistEpisodeIds()
        .then(res => {
          this.setState({episodes_on_watchlist: res.data.watchlist_ids})
        })
      }

    } else if (this.props.location.pathname.includes("tv_shows")){
      http.getTvShowDetails(this.props.match.params.id)
      .then(res => {
        this.setState({
          film: res.data.tv_show,
          on_watchlist: res.data.on_watchlist,
          type: "film"
        })
      })

      if(this.props.loginStatus){
        http.getWatchlistSeasonIds()
        .then(res => {
          this.setState({seasons_on_watchlist: res.data.watchlist_ids})
        })
      }

    } else if (this.props.location.pathname.includes("movies")){
      http.getMovieDetails(this.props.match.params.id)
      .then(res => {
        this.setState({
          film: res.data.movie,
          on_watchlist: res.data.on_watchlist,
          type: "film"
        })
      })
    }
  }

  handleNextClick = () => {
    if(this.state.type === "season"){
      const {tv_show_id, next_id} = this.state.film;
      history.push('/tv_shows/' + tv_show_id + '/seasons/' + next_id);
    } else if (this.state.type === "episode"){
      const {tv_show_id, season_id, next_id} = this.state.film
      history.push('/tv_shows/' + tv_show_id + '/seasons/' + season_id + '/episodes/' + next_id);
    }
    window.location.reload();
  }

  handlePrevClick = () => {
    if(this.state.type === "season"){
      const {tv_show_id, prev_id} = this.state.film;
      history.push('/tv_shows/' + tv_show_id + '/seasons/' + prev_id);
    } else if (this.state.type === "episode"){
      const {tv_show_id, season_id, prev_id} = this.state.film
      history.push('/tv_shows/' + tv_show_id + '/seasons/' + season_id + '/episodes/' + prev_id);
    }
    window.location.reload();
  }

  goToLogin = () => {
    history.push('/login')
    this.setState({dialogOpen: false})
  };

  goToSignup = () => {
    history.push('/signup')
    this.setState({dialogOpen: false})
  };

  handleClose = () => {
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
        var new_watchlist_ids = []
        this.setState({on_watchlist: true})
        if(type === "season"){
          new_watchlist_ids = [...this.state.seasons_on_watchlist]
          this.setState({seasons_on_watchlist: new_watchlist_ids.concat(id)})
        } else if (type === "episode") {
          new_watchlist_ids = [...this.state.episodes_on_watchlist]
          this.setState({episodes_on_watchlist: new_watchlist_ids.concat(id)})
        }
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
      var new_watchlist_ids = []
      var index = -1;
      this.setState({on_watchlist: false})
      if(type === "season"){
        new_watchlist_ids = [...this.state.seasons_on_watchlist]
        index = new_watchlist_ids.indexOf(id)
        if(index !== -1){
          new_watchlist_ids.splice(index, 1)
          this.setState({seasons_on_watchlist: new_watchlist_ids})
        }
      } else if (type === "episode") {
        new_watchlist_ids = [...this.state.episodes_on_watchlist]
        index = new_watchlist_ids.indexOf(id)
        if(index !== -1){
          new_watchlist_ids.splice(index, 1)
          this.setState({episodes_on_watchlist: new_watchlist_ids})
        }
      }
    })
  }

  render(){
    console.log(this.props)
    const { classes } = this.props;
    if(this.state.film){
      const film = this.state.film
      return(
        <div className="m-5">        
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <FilmDetailCard 
                show_detail={film.show_detail} 
                genres={film.genres ? film.genres : []} 
                reviewsCount={film.reviews.length} 
                content_rating={film.content_rating}
                type={this.state.type}
                film_id={this.state.film.id}
                nextPresent={this.state.film.next_id ? true : false}
                prevPresent={this.state.film.prev_id ? true : false}
                nextClickHandle={this.handleNextClick}
                prevClickHandle={this.handlePrevClick}
                on_watchlist={this.state.on_watchlist}
                number={this.state.film.number}
                addToWatchlist={this.addToWatchlist}
                removeFromWatchlist={this.removeFromWatchlist}/>
              <DescriptionCard roles={film.celebrity_show_roles} plot={film.show_detail.plot}/>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              {this.state.film.seasons && this.state.film.seasons.length > 0 && (
                <Card className={`mb-5 p-2 ${classes.card}`}>
                  <Typography variant="h5" align="center" className={classes.title} gutterBottom>
                    Seasons ({this.state.film.seasons.length}) 
                  </Typography>
                  <SeasonGrid 
                    list={this.state.film.seasons} 
                    showWatchListBtn={true} 
                    type="season" 
                    tvShowId={this.state.film.id}
                    addToWatchlist={this.addToWatchlist}
                    removeFromWatchlist={this.removeFromWatchlist}
                    seasons_on_watchlist={this.state.seasons_on_watchlist}
                    />
                </Card>
                )
                }
                {this.state.type === "season" && (
                <Card className={`mb-5 p-2 ${classes.card}`}>
                  <Typography variant="h5" align="center" className={classes.title} gutterBottom>
                    Episodes ({this.state.film.episodes.length}) 
                  </Typography>
                  <SeasonGrid 
                    list={this.state.film.episodes} 
                    showWatchListBtn={true} 
                    type="episode" 
                    seasonId={this.state.film.id}
                    tvShowId={this.state.film.tv_show_id}
                    addToWatchlist={this.addToWatchlist}
                    removeFromWatchlist={this.removeFromWatchlist}
                    episodes_on_watchlist={this.state.episodes_on_watchlist}/>
                </Card>
                )
                }
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <CastList roles={film.celebrity_show_roles}/>
              <ReviewList reviews={film.reviews}/>
            </Grid>
          </Grid>
          <AuthDialog 
            open={this.state.dialogOpen} 
            goToLogin={this.goToLogin} 
            goToSignup={this.goToSignup} 
            handleClose={this.handleClose}
          />
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(filmDetail)(Detail));

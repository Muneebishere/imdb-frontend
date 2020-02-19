import React, {Component} from 'react'
import DetailCard from '../Components/detail/DetailCard'
import Grid from '@material-ui/core/Grid'
import DescriptionCard from '../Components/detail/FilmPlotCard'
import * as http from '../services/index';
import CelebrityFilms from '../Components/detail/celebrityDetail/CelebrityFilms';
import Divider from '@material-ui/core/Divider';

class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      film: null,
      movies: []
    }
  }

  componentDidMount = () => {
    http.getMovieDetails(this.props.match.params.id)
    .then(res => {
      console.log(res)
      this.setState({film: res.data})
    })

    http.getMovies()
    .then(res => {
      console.log(res.data)
      this.setState({movies: res.data})
    })
    .catch(error => {
      console.log(error)
    })
  }

  render(){
    if(this.state.film && this.state.movies){
      const film = this.state.film
      return(
        <div>        
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <DetailCard 
              show_detail={film.show_detail} 
              genres={film.genres} 
              reviewsCount={film.reviews.length} 
              content_rating={film.content_rating}/>
            <DescriptionCard roles={film.celebrity_show_roles} plot={film.show_detail.plot}/>
            
          </Grid>
          <Divider className="mt-5" variant="fullWidth"/>
          <Grid container direction="row" justify="center" alignItems="center">
            <CelebrityFilms movies={this.state.movies} />
          </Grid>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

export default Detail;

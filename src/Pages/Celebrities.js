import React, { Component } from "react";
import Search from '../Components/SearchField'
import Grid from '@material-ui/core/Grid';
import CelebrityCard from '../Components/celebrityCard';
import * as http from '../services/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = theme => ({
  progressBar: {
    marginTop: "20px",
  }
});

class Celebrities extends Component { 
  state = {
    celebrities: [],
    search_text: ""
  }

  componentDidMount = () => {
    http.getAllCelebrities()
    .then(res => {
      console.log(res)
      this.setState({celebrities: res.data})
    })
    .catch(error => {
      console.log(error)
    })
  }

  searchCelebrities = (data) => {
    this.setState({search_text: data})

    http.getAllCelebrities(data)
    .then(res => {
      this.setState({celebrities: res.data})
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props;
    return(
      <div className="mt-4">
        <Grid container alignItems="center" direction="column" justify="center">
          <Grid item justify="center" container xs={5}>
            <Search 
              searchText={this.state.search_text} 
              handleChange={this.searchCelebrities}/>
          </Grid>

          <Grid item container justify="center" className="mt-5" alignItems="center">
            <Grid item direction="column" container justify="center">
              <Grid item direction="row" container justify="space-evenly">
                {this.state.celebrities.length > 0 ? this.state.celebrities.map(celebrity => 
                <CelebrityCard 
                  key={celebrity.id} 
                  celebrity={celebrity}
                />
                )  : (
                <CircularProgress className="mt-5"/>
                )}
              </Grid>
            </Grid>
              
          </Grid>
        </Grid>
      </div>
    )}
}

Celebrities.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Celebrities);
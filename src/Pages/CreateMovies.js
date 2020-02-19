import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import * as http from '../services/index';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
  dialogBtn: {
    padding: theme.spacing(4),
  }
}));

class CreateMovies extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      budget: 0,
      plot: '',
      duration: 0,
      genre_options: [],
      selected_genres: [],
      content_rating: "0",
      release_date: new Date(),
      dialog_open: false,
      poster: [] 
    }
  }

  componentWillMount = () => {
    http.getGenres()
    .then(res => {
      this.setState({genre_options: res.data})
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleState = event => {
    if(event.target){
      const { target: { name, value } } = event
      this.setState({ [name]: value })
    } else {
      this.setState({release_date: event})
    }
  }

  handleCheck = checkbox_id => {
    var arr = [...this.state.selected_genres]
    var index = arr.indexOf(checkbox_id)
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(checkbox_id);
    }
    this.setState({selected_genres: arr});
  }

  handleClose = () => {
    this.setState({
      dialog_open: false
    });
  }

  handleOpen = () => {
    this.setState({
      dialog_open: true,
    });
  }

  handleSave = (files) => {
    console.log(files)
    this.setState({
      files: files, 
      dialog_open: false
    });
  }

  fileUpload = e => {
    this.setState({poster: e.target.files[0]})
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData()
    data.append("budget", this.state.budget)
    data.append("plot", this.state.plot)
    data.append("duration", this.state.duration)
    data.append("genres", [this.state.selected_genres])
    data.append("content_rating", this.state.content_rating)
    data.append("release_date", this.state.release_date)
    data.append("poster", this.state.poster)
    data.append("title", this.state.title)
    
    http.createMovies(data)
    .then(res => {  
      console.log(res)
    })
  }

  render(){
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container justify="center">
          <Avatar className={classes.avatar}>
            <LocalMoviesIcon />
          </Avatar> 
          </Grid>
          <Typography className={classes.heading} component="h1" variant="h5">
            Create Movie
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  onChange={this.handleState}
                  value={this.state.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="budget"
                  variant="outlined"
                  required
                  fullWidth
                  id="budget"
                  label="Movie Budget($)"
                  type="number"
                  onChange={this.handleState}
                  value={this.state.budget}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="duration"
                  label="Duration(Minutes)"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.handleState}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Release Date"
                    value={this.state.release_date}
                    onChange={this.handleState}
                    keyboardbuttonprops={{
                      'aria-label': 'change date',
                    }}
                    name="release_date"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="plot"
                  label="Movie Plot"
                  id="plot"
                  multiline={true}
                  rows={6}
                  rowsMax={8}
                  value={this.state.plot}
                  onChange={this.handleState}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography className={classes.heading} component="h1" variant="h5">
                Select Genre
              </Typography>
                {this.state.genre_options.map(checkbox => 
                  <FormControlLabel
                    control={
                      <Checkbox 
                        key={checkbox.id} 
                        value={checkbox.id}
                        color="primary" 
                        onChange={() => this.handleCheck(checkbox.id)}
                        checked={this.state.selected_genres.includes(checkbox.id)}
                      />
                    }
                    label={checkbox.name}
                    key={checkbox.id}
                    name="genres"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <Typography className={classes.heading} component="h1" variant="h5">
                    Select Content Rating
                  </Typography>
                  <RadioGroup 
                    style={{ display: 'inline-block', width: '400px' }} 
                    aria-label="content_ratng" 
                    name="content_rating" 
                    value={this.state.content_rating} 
                    onChange={this.handleState}
                  >
                    <FormControlLabel value="0" control={<Radio />} label="General Audience (G)" />
                    <FormControlLabel value="1" control={<Radio />} label="Parental Guidance (PG)" />
                    <FormControlLabel value="2" control={<Radio />} label="Parents Cautioned (PG-13)" />
                    <FormControlLabel value="3" control={<Radio />} label="Restricted (R)" />
                    <FormControlLabel value="4" control={<Radio />} label="Adults Only (NC-17)" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid container justify="center" className={classes.dialogBtn}>
                {/* <ImageDropZoneDialog 
                  handleSave={this.handleSave} 
                  handleOpen={this.handleOpen} 
                  handleClose={this.handleClose}
                  open={this.state.dialog_open}
                /> */}
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={this.fileUpload}
                  name="poster"
                />
                <label htmlFor="raised-button-file">
                  <Button variant="raised" color="primary" component="span" className={classes.button}>
                    Upload
                  </Button>
                </label> 
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

CreateMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(CreateMovies);
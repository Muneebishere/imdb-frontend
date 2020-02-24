import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { signup } from '../Assets/styles/signup'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import * as http from '../services/index';
import Alert from '@material-ui/lab/Alert';

class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      username: "",
      avatar: "",
      avatar_url: "",
      error_messages: []
    }
  }

  handleState = event => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  fileUpload = e => {
    console.log("here")
    this.setState({
      avatar: e.target.files[0],
      avatar_url: URL.createObjectURL(e.target.files[0])
    })
  }

  removeAvatar = () => {
    this.setState({
      avatar: "",
      avatar_url: ""
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData()
    data.append("email", this.state.email)
    data.append("password", this.state.password)
    data.append("password_confirmation", this.state.confirm_password)
    data.append("first_name", [this.state.first_name])
    data.append("last_name", this.state.last_name)
    data.append("nickname", this.state.username)
    if (this.state.avatar){
      data.append("avatar", this.state.avatar) 
    }
    
    http.signupUser(data)
    .then(res => {  
      this.props.loginHandle(res);
    })
    .catch(error => {
      console.log(error.response)
      this.setState({error_messages: error.response.data.errors.full_messages})
    })
  }


  render(){
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {this.state.error_messages &&
                  this.state.error_messages.map(message => 
                  <Alert severity="error">{message}</Alert>)
                }   
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleState}
                  value={this.state.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                  onChange={this.handleState}
                  value={this.state.last_name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Nickname"
                  name="username"
                  autoComplete="username"
                  onChange={this.handleState}
                  value={this.state.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleState}
                  value={this.state.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleState}
                  value={this.state.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="current-password"
                  onChange={this.handleState}
                  value={this.state.confirm_password}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(event) => {
                    this.fileUpload(event)
                    event.target.value=null
                  }}
                  name="avatar"
                />
                <label htmlFor="raised-button-file">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component="span" 
                    className={classes.avatarBtn}
                    startIcon={<AttachFileIcon />}>
                    Upload Avatar
                  </Button>
                </label>
                <Grid container alignContent="center" justify="center">
                  
                  { this.state.avatar_url && (
                    <div>
                      <IconButton aria-label="delete" onClick={this.removeAvatar} size="small">
                        <ClearIcon fontSize="inherit" />
                      </IconButton>
                      <Avatar alt={this.state.username} src={this.state.avatar_url} className={classes.user_avatar} />
                    </div>
                  )}
                </Grid>
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
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
  
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(signup)(SignUp);
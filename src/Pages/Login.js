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
import * as http from '../services/index';
import Alert from '@material-ui/lab/Alert';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      error_messages: []
    }
  }

  handleState = event => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData()
    data.append("email", this.state.email)
    data.append("password", this.state.password)

    http.loginUser(data)
    .then(res => {
      this.props.loginHandle(res);
    })
    .catch(error => {
      console.log(error.response)
      this.setState({error_messages: error.response.data.errors})
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
            Login
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {this.state.error_messages &&
                  this.state.error_messages.map(message => 
                  <Alert severity="error">{message}</Alert>)
                }   
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
                <Link href="/signup" variant="body2">
                  Not a member? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
  
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(signup)(Login);
import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { boxShadow, themeColor, buttonTextColor } from '../Assets/styles/theme';
import { withStyles } from '@material-ui/styles';
import * as http from '../services/index';
import Alert from '@material-ui/lab/Alert';

const useStyles = () => ({
  root: {
    boxShadow: boxShadow,
  },
  button: {
    fontWeight: "bold",
    backgroundColor: themeColor,
    color: buttonTextColor,
    '&:hover': {
      backgroundColor: themeColor,
    }
  }
});

class AccountDetail extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    nickname: "",
    disabled: true,
    error_messages: [],
    success_message: "",
  }

  componentDidMount(){
    const { user } = this.props;
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      nickname: user.nickname
    })
  }

  handleChange = event => {
    const { target: { name, value } } = event
    this.setState({ 
      [name]: value,
      disabled: false
    })
  };

  handleUpdateUser = () => {
    const data = new FormData()
    data.append("email", this.state.email)
    data.append("first_name", this.state.first_name)
    data.append("last_name", this.state.last_name)
    data.append("nickname", this.state.nickname)

    http.updateUserAvatar(data)
    .then(res => {
      console.log(res)
      this.setState({success_message: "Updated successfully!"})
      this.props.handleUpdateUser(res.data)
      localStorage.setItem("uid", res.data.email)
    })
    .catch(error => {
      this.setState({error_messages: error.response.data.errors})
    })
  }

  render(){
    const { className, classes } = this.props;

    return (
      <Card
        className={clsx(classes.root, className)}>
        <form autoComplete="off" noValidate>
          <CardHeader subheader="The information can be edited" title="Profile"/>
            {this.state.success_message &&
              <Alert severity="success">{this.state.success_message}</Alert>
            }  
            {this.state.error_messages &&
              this.state.error_messages.map(message => 
              <Alert severity="error">{message}</Alert>)
            }  
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="First name"
                  margin="dense"
                  name="first_name"
                  onChange={this.handleChange}
                  required
                  value={this.state.first_name || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  margin="dense"
                  name="last_name"
                  onChange={this.handleChange}
                  required
                  value={this.state.last_name || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="dense"
                  name="email"
                  onChange={this.handleChange}
                  required
                  value={this.state.email || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  margin="dense"
                  name="nickname"
                  onChange={this.handleChange}
                  required
                  value={this.state.nickname || ''}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions> 
            <Button disabled={this.state.disabled} color="primary" className={classes.button} onClick={this.handleUpdateUser} variant="contained">
              Save details
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
};

AccountDetail.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(AccountDetail);
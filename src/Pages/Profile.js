import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import AccountProfile from '../Components/ProfileCard';
import AccountDetails from '../Components/ProfileDetail';

class Account extends Component{

  render(){
    return (
      <div className="p-5">
        <Grid container spacing={5}>
          <Grid item lg={5} md={6} xl={6} xs={12}>
            <AccountProfile {...this.props}/>
          </Grid>
          <Grid item lg={7} user={this.props.user} md={6} xl={6} xs={12}>
            <AccountDetails {...this.props}/>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Account;
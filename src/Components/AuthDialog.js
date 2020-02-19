import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { commonStyles } from '../Assets/styles/common';

export default function AlertDialog(props) {
  const common = commonStyles();
  
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={common.title} id="alert-dialog-title">{"Please Login to proceed"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            In order to add this show to your watchlist, you need to become a member first.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={common.btnTheme2} onClick={props.goToSignup} color="primary">
            Not a member?
          </Button>
          <Button className={common.btnTheme1} onClick={props.goToLogin} color="primary" autoFocus>
            Take me to login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

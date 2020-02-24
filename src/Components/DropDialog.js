import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
 
export default class ImageDropzoneDialog extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.handleOpen}>
          Add Avatar
        </Button>
        <DropzoneDialog
          open={this.props.open}
          onSave={this.props.handleSave}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          showPreviewsInDropzone={true}
          maxFileSize={5000000}
          filesLimit={1}
          onClose={this.props.handleClose}
        />
      </div>
    );
  }
}
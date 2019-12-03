import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import queryString from 'query-string';

class ReviewModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      title: '',
      text: '',
      error: false
    }
  }

  handleName = e => {
    this.setState({ name: e.target.value })
  }

  handleTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleText = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = () => {
    console.log(this.state);
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    var query = queryString.stringify({
      name: this.state.name,
      title: this.state.title,
      text: this.state.text,
      hotelId: this.props.hotelId,
    })

    fetch('http://localhost:8090/reviews', {
     method: 'POST',
     headers: headers,
     body: query
    })
    .then(res => {
      if(res.ok) return res.json();
    })
    .then(json => {
      let { message, success } = json;
      console.log("message: ", message)
      if(success) {
        let reviewObj = {
          userNickname: this.state.name,
          title: this.state.title,
          reviewText: this.state.text,
          hotelId: this.props.hotelId,
          reviewId: message
        }
        // reviewId, title, date, user, reviewText
        console.log("review obj: ", reviewObj)
        this.props.addReview(reviewObj)
        this.props.handleClose()
      }
      else if(message === "error") this.setState({ error: true })
    })
    .catch(err => {
      console.log("error while signing user up ", err)
    })
  }

  render() {
    const { open, handleClose } = this.props;
    const { error } = this.state;
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Write a Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your honest reviews help others book their ideal experience. Thank you :) 
            </DialogContentText>
            <form onSubmit={this.handleSubmit} noValidate>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
                onChange={this.handleName}
              />
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                onChange={this.handleTitle}
              />
              <TextField
                autoFocus
                margin="dense"
                id="text"
                label="Review"
                type="text"
                fullWidth
                onChange={this.handleText}
              />
              {error && 
                  <InputLabel error htmlFor="component-error">Something went wrong, please try agian</InputLabel>
                }
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ReviewModal;
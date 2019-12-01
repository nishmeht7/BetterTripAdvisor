import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import queryString from 'query-string';

const styles = theme => {

}

class SearchModal extends Component {

    constructor() {
      super();
      this.state = {
        keyword: '',
        city: '',
        error: false,
      }
    }

    handleKeyword = e => {
      e.preventDefault();
      this.setState({ keyword: e.target.value });
    }

    handleCity = e => {
      e.preventDefault();
      this.setState({ city: e.target.value });
    }

    handleSubmit = e => {
      e.preventDefault();
      console.log("keyword: ", this.state.keyword);
      console.log("city: ", this.state.city);   
      if(this.state.city === "" && this.state.keyword === "") return; 
      this.fetchHotels();
    }

    fetchHotels = () => {
      let query = queryString.stringify({
        keyword: this.state.keyword,
        city: this.state.city
      })
      console.log("query: ", query)
      fetch(`http://localhost:8090/hotelInfo?${query}`)
      .then(res => {
        if(res.ok) return res.json();
      })
      .then(jsonArr => {
        this.props.setResults(jsonArr);
      })
      .catch(err => console.log("error while fetching hotels: ", err))
    }
    
    render() {
        let { cookies, classes } = this.props;
        return (
            <div>
              <Typography component="h1" variant="h5">
                 Search for Hotels
               </Typography>
               <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="keyword"
                    label="keyword"
                    name="keyword"
                    autoFocus
                    onChange={this.handleKeyword}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="city"
                    label="city"
                    type="city"
                    id="city"
                    onChange={this.handleCity}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Search
                  </Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SearchModal)


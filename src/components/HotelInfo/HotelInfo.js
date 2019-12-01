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
import Hotel from '@material-ui/icons/Hotel';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import queryString from 'query-string';

import ReviewCard from '../ReviewCard';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Nish\'s Travel Advisor '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?travel)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paperWrapper: {
    backgroundColor: '#F2F2F2'
  },
  paper: {
    height: '80vh',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#F2F2F2'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  reviewsWrapper: {
    maxHeight: '100%',
    // display: 'flex',
    overflow: 'scroll',
    flexDirection: 'column',
    padding: '10px',
  }
});

class HotelInfo extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: false,
      hotelId: 0,
      hotelInfo: {},
      reviewsArr: [],
    }
  }

  componentDidMount() {
    console.log("props: ", this.props);
    const params = queryString.parse(this.props.location.search);
    let hotelId = params.hotelId;
    // if(hotelId === null || isNaN(hotelId)) this.props.history.push('/home');
    this.setState({ hotelId: hotelId }, () => {
      this.fetchHotelInfo();
    });
  }

  fetchHotelInfo() {
    console.log("hotelID: ", this.state.hotelId);
    fetch(`http://localhost:8090/reviews?hotelId=${this.state.hotelId}`)
    .then(res => {
      if(res.ok) return res.json()
    })
    .then(json => {
      const { name, addr, reviewsArr } = json;
      let hotelObj = {name, addr};
      this.setState({ hotelInfo: hotelObj, reviewsArr: reviewsArr }, () => {
        console.log("the state is: ", this.state);
      });
    })
    .catch(err => console.log("error while fetching hotel info: ", err));
  }

  handleUsername = e => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  handlePassword = e => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("username: ", this.state.username);
    console.log("password: ", this.state.password);    
    this.loginUser();
  }

  loginUser = () => {
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    var query = queryString.stringify({
      username: this.state.username,
      password: this.state.password
    })

    fetch('http://localhost:8090/login', {
     method: 'POST',
     headers: headers,
     body: query
    })
    .then(res => {
      console.log("the response is: ", res)
      if(res.ok) return res.json();
    })
    .then(json => {
      let { message, success } = json;
      console.log("message: ", message)
      if(success) {
        this.props.cookies.set('nishTrip', this.state.username)
        this.props.history.push('/home')
      }
      else if(message === "error") this.setState({ error: true })
    })
    .catch(err => {
      console.log("error while signing user up ", err)
    })
  }

  isObjEmpty = obj => {
    return Object.entries(obj).length === 0 && obj.constructor === Object
  }

  render() {
    const { classes, hotel } = this.props;
    let { error, hotelInfo, reviewsArr } = this.state;
    let name = "Hotel Info";
    let addr = "";
    if(!this.isObjEmpty(hotelInfo)) {
      name = hotelInfo.name === null ? "Hotel Info" : hotelInfo.name;
      addr = hotelInfo.addr === null ? "" : hotelInfo.addr;
    }
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={4} className={classes.image} />
        <Grid className={classes.paperWrapper} item xs={12} sm={10} md={8} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Hotel />
            </Avatar>
            <Typography component="h1" variant="h5">
              {name}
            </Typography>
            <Typography component="h3" variant="h5">
              {addr}
            </Typography>
              <div className={classes.reviewsWrapper}>
                {reviewsArr.map(review => (
                  <ReviewCard review={review} />
                ))}
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HotelInfo);

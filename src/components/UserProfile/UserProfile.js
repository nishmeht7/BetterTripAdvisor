import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hotel from '@material-ui/icons/Hotel';
import LocalActivity from '@material-ui/icons/LocalActivity';
import Save from '@material-ui/icons/Save';
import RateReview from '@material-ui/icons/RateReview';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import HotelCard from '../HotelCard';
import ReviewModal from '../ReviewModal';
import fetchRequest from '../util';

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
    height: '90vh',
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
  avatarTwo: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
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
    overflow: 'scroll',
    flexDirection: 'column',
    padding: '10px',
  },
  iconsWrapper: {
    display: 'flex',
    marginTop: 20,
    cursor: 'pointer',
  },
  slider: {
    marginTop: 20
  }
});

class HotelInfo extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      open: false,
      viewReviews: true,
      savedHotels: []
    }
  }

  componentDidMount() {
    let { cookies } = this.props;
    let user = cookies.get('user');
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    let userId = user.userId;

    let url = `http://localhost:8090/hotelInfo?userId=${userId}`;
    fetchRequest(url, "GET", null)
    .then(arr => {
      console.log("the arr is: ", arr);
      if(arr && arr.length > 0) {
        this.setState({ savedHotels: arr });
      }
    })
    .catch(err => {
      console.log("error while saving hotel: ", err)
    })    
  }

  isObjEmpty = obj => {
    return Object.entries(obj).length === 0 && obj.constructor === Object
  }

  handleDeleteHotels = () => {
    let { cookies } = this.props;
    let user = cookies.get('user');
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    let userId = user.userId;
    var query = queryString.stringify({
      userId: userId,
      delete: true
    })
    let url = `http://localhost:8090/hotelInfo`

    fetchRequest(url, "POST", query)
    .then(json => {
      const { success } = json; 
      if(success) {
        this.setState({ savedHotels: [] });
      }
    })
    .catch(err => {
      console.log("error while saving hotel: ", err)
    })  
  }

  formatTime = () => {
    let lastLogin = "Today";
    let timestamp = this.props.cookies.get("lastLogin");
    if(timestamp != null) {
      let timeArr = timestamp.split('.');
      let date = timeArr.slice(0,3).join('-');
      let time = timeArr.slice(3).join(':');
      lastLogin = `${date} ${time}`;
    }
    return lastLogin;
  }

  render() {
    const { classes, hotel, cookies } = this.props;
    let { error, savedHotels, open, viewReviews } = this.state;
    let user = cookies.get('user');
    let title = `${user.username}'s saved hotels`;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={4} className={classes.image} />
        <Grid className={classes.paperWrapper} item xs={12} sm={10} md={8} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
              <div className={classes.iconsWrapper}>
                {savedHotels.length > 0 && 
                  <Avatar onClick={this.handleDeleteHotels} className={classes.avatarTwo}>
                    <DeleteOutlineIcon />
                  </Avatar>
              }
              </div>
              <div className={classes.reviewsWrapper}>
                {viewReviews && savedHotels.map(result => (
                  <HotelCard  key={result.hotelId} {...this.props} result={result} />
                ))}
              </div>
              <Typography component="h4" variant="subtitle2">
                Last Login: {this.formatTime()}
              </Typography>
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

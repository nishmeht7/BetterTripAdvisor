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

import ReviewCard from '../ReviewCard';
import ReviewModal from '../ReviewModal';
import AttractionsCard from './AttractionsCard';
import Slider from './Slider';
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
    // display: 'flex',
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
      username: '',
      password: '',
      error: false,
      hotelId: 0,
      hotelInfo: {},
      reviewsArr: [],
      attractionsArr: [],
      open: false,
      reviewId: '',
      viewReviews: true,
      likedObj: {}
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
    let url = `http://localhost:8090/reviews?hotelId=${this.state.hotelId}`;

    fetchRequest(url, "GET", null)
    .then(json => {
      const { name, addr, reviewsArr } = json;
      let hotelObj = {name, addr};
      this.setState({ hotelInfo: hotelObj, reviewsArr: reviewsArr }, () => {
        console.log("the state is: ", this.state);
      });
    })
    .catch(err => console.log("error while fetching hotel info: ", err));
  }

  isObjEmpty = obj => {
    return Object.entries(obj).length === 0 && obj.constructor === Object
  }

  handleAttractions = () => {
    let radius = 2;
    const { hotelId } = this.state;
    let reviewsArr = this.state.reviewsArr;
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    var query = queryString.stringify({
      hotelId: hotelId,
      radius: radius
    })

    let url = `http://localhost:8090/attractions?hotelId=${hotelId}&radius=${radius}`;
    fetchRequest(url, "GET", query)
    .then(json => {
      const { results } = json;
      this.setState({ attractionsArr: results }, () => {
        this.setState({ viewReviews: false })
      })

    })
    .catch(err => {
      console.log("error while fetching attractions: ", err)
    })
  }

  handleReview = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSaveHotel = () => {
    let { cookies } = this.props;
    let user = cookies.get('user');
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    var query = queryString.stringify({
      userId: user.userId,
      hotelId: this.state.hotelId
    })

    let url = 'http://localhost:8090/hotelInfo'
    fetchRequest(url, "POST", query)
    .then(json => {
      console.log("saved hotel json: ", json)
    })
    .catch(err => {
      console.log("error while saving hotel: ", err)
    })
  }

  addReview = review => {
    this.setState(prevState => ({
        reviewsArr: [review, ...prevState.reviewsArr]
    }))
  }

  updateReview = review => {
    let reviewsArr = this.state.reviewsArr;
    reviewsArr.forEach((elem, idx) => {
      if(elem.reviewId === review.reviewId) {
        let reviewObj = reviewsArr[idx];
        reviewObj.title = review.title;
        reviewObj.reviewText = review.reviewText;
        reviewsArr[idx] = reviewObj;
        console.log(reviewsArr[idx])
      }
    })
    this.setState(prevState => ({
      reviewArr: reviewsArr
    }))
  }

  handleEditReview = reviewId => {
    this.setState({ open: true, reviewId: reviewId })
  }

  handleRemoveReview = reviewId => {
    let reviewsArr = this.state.reviewsArr;
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    var query = queryString.stringify({
      reviewId: reviewId,
      delete: true
    })

    let url = 'http://localhost:8090/reviews';

    fetchRequest(url, "POST", query)
    .then (json => {
      const { success } = json;
      if(success) {
        let updatedArr = this.state.reviewsArr.filter(elem => elem.reviewId !== reviewId)
        this.setState({ reviewsArr: updatedArr })
      }
    })
    .catch(err => {
      console.log("error while deleting review: ", err)
    })
  }

  updateView = num => {
    let viewReviews = this.state.viewReviews;
    let attractionsArr = this.state.attractionsArr;
    if(num === 1 && viewReviews) {
      if(attractionsArr.length < 1) this.handleAttractions()
      else this.setState({ viewReviews: false })
    }
    else if(num === 0 && !viewReviews) {
      this.setState({ viewReviews: true })
    }
  }

  handleLikeReview = reviewId => {
    let { cookies } = this.props;
    let user = cookies.get('user');

    let userId = user.userId;
    var query = queryString.stringify({
      userId: userId,
      reviewId: reviewId,
      like: true
    })

    let url = 'http://localhost:8090/reviews';
    fetchRequest(url, "POST", query)
    .then(json => {
      const { success } = json; 
      if(success) {
        let { likedObj } = this.state;
        let updatedArr = this.state.reviewsArr.map(review => {
          if(review.reviewId === reviewId && !likedObj.hasOwnProperty(reviewId)) {
            review.likes = review.likes + 1;
            let newObj = likedObj;
            newObj[reviewId] = 1;
            this.setState({ likedObj: newObj })
          }
          return review;
        });
        this.setState({ reviewsArr: updatedArr })
      }
    })
    .catch(err => {
      console.log("error while saving hotel: ", err)
    }) 
  }

  render() {
    const { classes, hotel, cookies } = this.props;
    let { error, hotelInfo, reviewsArr, open, hotelId, reviewId, viewReviews, attractionsArr } = this.state;
    let user = cookies.get('user');
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
              <div className={classes.iconsWrapper}>
                <Avatar onClick={this.handleReview} className={classes.avatarTwo}>
                  <RateReview />
                </Avatar>
                <Avatar onClick={this.handleSaveHotel} className={classes.avatarTwo}>
                  <Save />
                </Avatar>
              </div>
              <div className={classes.reviewsWrapper}>
                {!viewReviews && attractionsArr.map(attr => (
                  <AttractionsCard key={attr.place_id} title={attr.name} subHeader={attr.formatted_address} text={"text"} />
                ))}
                {viewReviews && reviewsArr.map(review => (
                  <ReviewCard 
                    key={review.reviewId}
                    review={review}
                    user={user}
                    handleEditReview={this.handleEditReview}
                    handleRemoveReview={this.handleRemoveReview}
                    handleLikeReview={this.handleLikeReview}
                  />
                ))}
              </div>
              <ReviewModal 
                user={user}
                hotelId={hotelId} 
                open={open} 
                handleClose={this.handleClose} 
                addReview={this.addReview}
                reviewId={reviewId}
                updateReview={this.updateReview}
              />
              <div className={classes.slider}>
                <Slider updateView={this.updateView} />
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

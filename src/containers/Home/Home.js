import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import MapIcon from '@material-ui/icons/Map';
import { withStyles } from '@material-ui/core/styles';

import SearchModal from '../../components/SearchModal';
import HotelCard from '../../components/HotelCard';
import NavBar from '../../components/NavBar';
import MapWrapper from '../../components/MapWrapper';
import fetchRequest from '../../components/util';

const styles = theme => ({
  root: {
  	display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?skyline)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    height: '70%',
    width: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    paddingTop: 10,
    boxShadow: '0px -1px 3px rgba(50, 50, 50, 0.75)',
    backgroundColor: '#F2F2F2'
  },
  results: {
  	height: '60%',
    display: 'flex',
    overflow: 'scroll',
    justifyContent: 'space-between',
    maxWidth: '80%',
    flexWrap: 'wrap',
    padding: '10px',
  },
  avatarTwo: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
});

class Home extends Component {
	constructor() {
		super()
		this.state = {
			resultsArr: [],
			hotelsArr: [],
			open: false
		}
	}

	handleOpen = () => {
		let url = `http://localhost:8090/hotelInfo?map=${true}`

		fetchRequest(url, "GET", null)
		.then(json => {
			this.setState({ hotelsArr: json, open: true })
		})
		.catch(err => {
			console.log("error while fetching all hotels: ", err)
		})
	}

	handleClose = () => {
		this.setState({ open: false })
	}

	setResults = arr => {
		this.setState({ resultsArr: arr })
	}

	render() {
		let { classes, cookies, history } = this.props;
		let { resultsArr, hotelsArr } = this.state;
		return (
			<div>
			<div className={classes.root}> 
        		<div className={classes.paper}>
        			<Avatar onClick={this.handleOpen} className={classes.avatarTwo}>
	                  <MapIcon />
	                </Avatar>
        			<MapWrapper open={this.state.open} handleClose={this.handleClose} results={hotelsArr} />
        			<SearchModal setResults={this.setResults} />
        			<div className={classes.results}>
	        			{resultsArr.map(result => (
		        			<HotelCard key={result.hotelId} {...this.props} result={result} />
	        			))}
        			</div>
        		</div>
			</div>
			</div>
		)
	}
}

export default withStyles(styles)(Home);

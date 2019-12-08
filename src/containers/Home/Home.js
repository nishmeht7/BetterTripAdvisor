import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import SearchModal from '../../components/SearchModal';
import HotelCard from '../../components/HotelCard';

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
  }
});

class Home extends Component {
	constructor() {
		super()
		this.state = {
			resultsArr: []
		}
	}

	setResults = arr => {
		this.setState({ resultsArr: arr })
	}

	render() {
		let { classes } = this.props;
		let { resultsArr } = this.state;

		return (
			<div className={classes.root}> 
        		<div className={classes.paper}>
        			<SearchModal setResults={this.setResults} />
        			<div className={classes.results}>
	        			{resultsArr.map(result => (
		        			<HotelCard key={result.hotelId} {...this.props} result={result} />
	        			))}
        			</div>
        		</div>
			</div>
		)
	}
}

export default withStyles(styles)(Home);

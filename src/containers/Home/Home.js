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
		let { cookies, classes } = this.props;
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

import React, { Component } from 'react';

class Home extends Component {
	render() {
		let { cookies } = this.props;
		return (
			<h1>Hi {cookies.get('nishTrip')}</h1>
		)
	}
}

export default Home;

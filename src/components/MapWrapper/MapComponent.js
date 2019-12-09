import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class MapComponent extends React.Component {
	render() {
		const { results, center } = this.props;
		return (
				<Map
					google={this.props.google}
					zoom={8}
					style={mapStyles}
					initialCenter={center}
				>
				{
					results != null &&
					results.map(hotel => (
						<Marker
					      key={hotel.hotelId} position={{ lat: hotel.lat, lng: hotel.lng }}
					    />
					))
				}
				</Map>
			);
		}
	}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAb85qSDOvXree1nRCpbyBvwnoqQQCsDJI'
})(MapComponent);


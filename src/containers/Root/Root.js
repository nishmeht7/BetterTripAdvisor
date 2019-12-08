import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import LoginPage from '../../components/LoginPage';
import SignupPage from '../../components/SignupPage';
import HotelInfo from '../../components/HotelInfo';
import HomePage from '../Home';
import NavBar from '../../components/NavBar';
import UserProfile from '../../components/UserProfile';

import './root.css';

const cookies = new Cookies()

class Root extends Component {
  render() {
    const isRegistered = cookies.get('nishTrip')
    const path = isRegistered ? '/home' : '/login'
    let isLoggedIn = isRegistered == null ? false : true;

    return (
      <BrowserRouter basename=''>
        <NavBar cookies={cookies} />
        <Route path='/signup' render={ props => <SignupPage {...props} cookies={cookies} />}/>
        {/*<Route path="/">
          <Redirect exact from='/' to={path} />
        </Route>*/}
        <Switch>
          <Route path='/home' render={ props => <HomePage {...props} cookies={cookies} setHotel={this.setHotel} />} />
          <Route
            path='/login'
            render={ props => 
              <LoginPage {...props} cookies={cookies} />
            }
          />
          <Route path='/hotelInfo' render={ props => <HotelInfo {...props} cookies={cookies} />} />
          <Route path='/userProfile' render={ props => <UserProfile {...props} cookies={cookies} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;

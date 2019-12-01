import React from 'react';
import Cookies from 'universal-cookie'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import LoginPage from '../../components/LoginPage';
import SignupPage from '../../components/SignupPage';
import HomePage from '../Home';
import './root.css';

const cookies = new Cookies()

function Root() {
  const isRegistered = cookies.get('nishTrip')
  const path = isRegistered ? '/home' : '/login'
  let isLoggedIn = isRegistered == null ? false : true;

  return (
    <BrowserRouter basename=''>
      <Route exact path="/">
        <Redirect exact from='/' to={path} />
      </Route>
      <Switch>
        <Route path='/home' render={() => <HomePage cookies={cookies} />} />
        <Route path='/signup' render={props => <SignupPage {...props} cookies={cookies} />}/>
        <Route
          path='/login'
          render={props => 
            <LoginPage {...props} cookies={cookies} />
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Root;

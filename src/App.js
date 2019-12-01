import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const onClick = () => {
    fetch("http://localhost:8090/reviews?hotelId=10323&num=3");
  }

  const onClickTwo = () => {
    fetch("https://randomuser.me/api/?results=10");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={onClick}>fetch</button>
        <button onClick={onClickTwo}>fetch2</button>
      </header>
    </div>
  );
}

export default App;

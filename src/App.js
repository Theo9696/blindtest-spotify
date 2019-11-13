/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQBj8nzALqnYA3TJUIyKEln6O4O6xO3-GSoOPbjC8__UcNyece6mTjrKbEtVwrI7vP5dQelfcWJK6MjFi1OqfTpYjnLpTfsM_9NGYJHp0VIV8E3OkfD-PTNsQuWFcGYk2eLcZ4B1KsOhVrS2UmJdFI_cdhfrVoRHaH1TW6pfkw';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      data: {},
      songLoaded: false
    };
  }

  async componentDidMount() {
    this.setState({ text: "Bonjour" });

    const res = await fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
      Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json());

    console.log(res);
    this.setState({ data: res, songLoaded: true });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          {this.state.songLoaded ?
          <div>
            <p>{this.state.text}</p>
            <p>Nombre de musiques + {this.state.data.items.length}</p>
            {this.state.data.items ? <p>Titre première chanson + {this.state.data.items[0].track.name}</p> : null}
          </div>
          : 
          <img src={loading} className="Logo-loarding" alt="loading"/>}
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;

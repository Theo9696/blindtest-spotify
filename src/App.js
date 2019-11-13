/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import AlbumCover from './AlbumCover';

const apiToken = 'BQC3TkIFJSHfVSgKkvN5wVVjNJPXfrhx-oePniCoaHGSFETXzIxvqu74QF1XjgtG7n3J_BIUDVtgMK8yP1_dTO86Jkl9dh_X9gPXhtAaTRv-AmnnLtETe7Sd8XO5b1DWoHUaYkXkI517QpLduMl0m5kmpxtIO2Gov_FdvUqWbw';

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
      tracks: {},
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
    this.setState({ tracks: res, songLoaded: true });

  }

  render() {
    const currentTracks = this.state.tracks ? this.state.tracks.items : null;
    const currentTrack = currentTracks && currentTracks[0] ? currentTracks[0].track : null;
    const currentTrack1 = currentTracks && currentTracks[1] ? currentTracks[1].track : null;
    const currentTrack2 = currentTracks && currentTracks[2] ? currentTracks[2].track : null;
    const firstTracks = [currentTrack, currentTrack1, currentTrack2];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          {this.state.songLoaded && currentTrack ?
          <div>
            <p>{this.state.text}</p>
            <p>Nombre de musiques + {this.state.tracks.items.length}</p>
            {this.state.tracks.items ? 
              <div>
                <p>Titre première chanson + {currentTrack.name}</p>
                <AlbumCover track={currentTrack}/>
                <Sound url={currentTrack.preview_url} playStatus={Sound.status.PLAYING}/>
              </div>
            : null}
          </div>
          : 
          <img src={loading} className="Logo-loarding" alt="loading"/>}
        </div>
        <div className="App-buttons">
          {firstTracks.map(chanson => (chanson ? (<Button >{chanson.name}</Button>) : null))}
        </div>
      </div>
    );
  }
}

export default App;

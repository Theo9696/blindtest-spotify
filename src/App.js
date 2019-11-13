/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import AlbumCover from './AlbumCover';

const apiToken = 'BQC4OsCcIatFS4wO-BsvKMxMOuFFbiU06255JwOS6LunJVo5MyyUMcgHpEPvm1rvEGCfSUNQSYTuQCUTR1wf1RQKex1zUAZgOroH0uw6tl3aQJhvGNz5b4Xi4toPHPLLeTqk_fy_Xu9gjqqS_vX9N-8SdKiF7oCD8JJgaZ3OTw';

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
      tracks: [],
      songLoaded: false,
      currentTrack: null,
    };
  }

  componentDidMount() {
    this.setState({ text: "Bonjour" });

    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
      Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then(res => {
      const currentTracks = res.items;
      const currentTrack0 = currentTracks && currentTracks[0] ? currentTracks[0].track : null;
      const currentTrack1 = currentTracks && currentTracks[1] ? currentTracks[1].track : null;
      const currentTrack2 = currentTracks && currentTracks[2] ? currentTracks[2].track : null;
      const firstTracks = [currentTrack0, currentTrack1, currentTrack2];

      this.setState({ tracks: firstTracks, songLoaded: true });
      if (firstTracks) { this.setState({ currentTrack: firstTracks[Math.round(Math.random()*firstTracks.length)]})}
    }
)

    

  }

  checkAnswer(id) {
    alert(this.state.currentTrack.id == id);
  }

  render() {
    const currentTrack = this.state.currentTrack;
    const tracks = this.state.tracks;
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
            <p>Nombre de musiques + {tracks.length}</p>
            <Sound url={currentTrack.preview_url} playStatus={Sound.status.PLAYING}/>
            {tracks.map(track =>(
              <div>
                <p>Titre première chanson + {track.name}</p>
                <AlbumCover track={track}/>
              </div>))}
          </div>
          : 
          <img src={loading} className="Logo-loarding" alt="loading"/>}
        </div>
        <div className="App-buttons">
          {tracks.map(chanson => (chanson ? (<Button onClick={() => this.checkAnswer(chanson.id)}>{chanson.name}</Button>) : null))}
        </div>
      </div>
    );
  }
}

export default App;

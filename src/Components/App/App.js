
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

/* App class, which ist top level before being exported to index.js */

class App extends React.Component {
  constructor(props) {
    super(props);

    /* state contains three dynamically created elements: 
    - two arrays, for containing objects { artists, album, name}
    - one string with a default value, to be replaced
    */
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist Name',
      playlistTracks: []
      };

    /* binding the methods, all defined in this same component */

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
   /* this.calcTotalTimePlayList = this.calcTotalTimePlayList.bind(this); */
  }

  /* methods for managing the playList */
  addTrack(track) {
    let trackPlayList = false;
    this.state.playlistTracks.forEach(playlistTrack => {
      if (playlistTrack.id === track.id) {
        trackPlayList = true;
        }
      }
    );
      if (!trackPlayList) {
        let updatePlaylist = this.state.playlistTracks;
        updatePlaylist.push(track);
        this.setState({playlistTracks: updatePlaylist});
      }
  }

  removeTrack(track) {
    let updatePlaylist = this.state.playlistTracks.filter(playlistTrack => {
      return playlistTrack.id !== track.id;
    });
    this.setState({playlistTracks: updatePlaylist});
  }

  /*calcTotalTimePlayList() {
    let totalTime = 0;
    while(this.state.playlistTracks) {
      this.state.playlistTracks.forEach(track => {
        totalTime += track.duration_ms;
      })
      return totalTime;
    }
    const minutes = Math.floor(totalTime/60000);
     const seconds = ((totalTime % 60000) /1000).toFixed(0);
     return minutes + ':' + (seconds < 10 ? '0': '') + seconds;
    
  } */

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(playlistTrack => {
      trackURIs.push(playlistTrack.uri);
      
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistTracks:[], playlistName: 'New Playlist', searchResults:[]});
  }

 /* Method for the playListName */

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  /*Finishing the promise begun in ./util/Spotify.js */
  search(term) {
    Spotify.search(term).then(tracks => this.setState({searchResults: tracks}));
  }

  /* render to prop the methods in the children components */
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          <SearchBar onSearch={this.search} />
          
          <div className="App-playlist">

            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />

            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
             
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            
            />

          </div>
        </div>
      </div>
    );
  }
}


export default App;
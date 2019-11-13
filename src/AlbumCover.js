import React, { Component } from 'react';

class AlbumCover extends Component {

    render() {
        const src = this.props.track ? this.props.track.album.images[0].url : null; // A changer ;)
        console.log(src);
        return( <img src={src} style={{ width: 400, height: 400 }}></img>);
    }
}

export default AlbumCover;
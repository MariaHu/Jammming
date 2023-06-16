import React from "react";
import "./Track.css";

class Track extends React.Component {
   constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
   }
 
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack() {
      this.props.onRemove(this.props.track);
    }
    renderAction() {
      if(this.props.isRemoval) {
       return <button className="Track-action" onClick={this.removeTrack}>-</button>;
      }
      else {
       return <button className="Track-action" onClick={this.addTrack}>+</button>;
      }
   }

  durationInMins = (timeMs) => {
     const minutes = Math.floor(timeMs/60000);
     const seconds = ((timeMs % 60000) /1000).toFixed(0);
     return minutes + ':' + (seconds < 10 ? '0': '') + seconds;
   }

    render() {
        return (
            <div className="Track">
            <div className="Track-information">
              <h3>{this.props.track.name}</h3>
              <p> {this.props.track.artist} || {this.props.track.album} || {this.durationInMins(this.props.track.duration_ms)}</p>
            </div>
            {this.renderAction()}
          </div>
        );
    };
}

export default Track;
import React, { Component } from 'react';
import moment from "moment";
import bowser from "bowser";
import video from "./video.mp4";
import './App.css';

import volumeOff from "./volumeOff.svg";
import volumeOn from "./volumeOn.svg";

const RELEASE_DATE = moment("2017-07-30T23:30:00-04:00");
const IS_DESKTOP = !bowser.mobile && !bowser.tablet;

class App extends Component {
  state = {
    muted: !IS_DESKTOP, // mobile and tablet devices need to start muted in order to autoplay
    sunCount: 0,
  };

  componentDidMount() {
    this.countdown = setInterval(() => {
      this.forceUpdate();
    }, 1000);

    this.videoNode.addEventListener('ended', this.onEnd);
  }

  componentWillUnmount() {
    window.clearInterval(this.countdown);

    this.videoNode.removeEventListener('ended');
  }

  get duration() {
    return moment.duration(RELEASE_DATE.diff(moment()));
  }

  toggleMute = () => {
    this.setState({
      muted: !this.state.muted,
    });

    this.videoNode.muted = !this.videoNode.muted;
  };

  onLinkClick = (e) => {
    e.stopPropagation();
  };

  onEnd = e => {
    this.setState({ sunCount: this.state.sunCount + 1 });

    this.videoNode.play();
  };

  bindRef = videoNode => {
    this.videoNode = videoNode;
  };

  render() {
    const { muted, sunCount } = this.state;
    const remaining = this.duration;
    const isReleased = remaining.asSeconds() <= 0;
    const volumeIcon = muted ? volumeOff : volumeOn;

    return (
      <div className="App" onClick={this.toggleMute}>
        <video ref={this.bindRef} autoPlay muted={this.state.muted} id="video-background"
               playsInline>
          <source src={video} type="video/mp4" />
        </video>

        <div className="AppHeader">
          <img className="volume" src={volumeIcon} alt="Volume" />

          <a onClick={this.onLinkClick} target="_tab" href="https://twitter.com/treytherobot"
             className="twitter">@treytherobot</a>
        </div>

        <div className="AppContent">
          <div className="spacer" />

          <div className="countDown">
            {isReleased ? <h1>
              IT'S OUT!
            </h1> : <h1>
              {remaining.days()} {'days '}
              {remaining.hours()} {'hours '}
              {remaining.minutes()} {'minutes '}
              {remaining.seconds()} {'seconds '}
            </h1>}
          </div>

          <div className="sunCount">
            <span>({sunCount} {sunCount === 1 ? 'sun' : 'suns'} endured)</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
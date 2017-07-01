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
    }, 250);

    this.videoNode.addEventListener('ended', this.onEnd);
  }

  componentWillUnmount() {
    window.clearInterval(this.countdown);

    this.videoNode.removeEventListener('ended');
  }

  get remaining() {
    return moment.duration(RELEASE_DATE.diff(moment()));
  }

  get days() {
    const d = this.remaining.days();

    if (d <= 0) return "";
    if (d === 1) return "1 day";

    return `${d} days`;
  }

  get hours() {
    const h = this.remaining.hours();

    if (h <= 0) return "";
    if (h === 1) return "1 hour";

    return `${h} hours`;
  }

  get minutes() {
    const m = this.remaining.minutes();

    if (m <= 0) return "";
    if (m === 1) return "1 minute";

    return `${m} minutes`;
  }

  get seconds() {
    const s = this.remaining.seconds();

    if (s <= 0) return "0 seconds";
    if (s === 1) return "1 second";

    return `${s} seconds`;
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
    const remaining = this.remaining;
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
              {[
                [this.days, this.hours, this.minutes].filter(Boolean).join(", "), this.seconds]
                .filter(Boolean)
                .join(" and ")
              }
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

import React, { Component } from 'react';
import moment from "moment";
import video from "./video.mp4";
import './App.css';

const RELEASE_DATE = moment("2017-07-30T23:30:00-04:00");

class App extends Component {
  componentDidMount() {
    this.countdown = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.countdown);
  }

  get duration() {
    return moment.duration(RELEASE_DATE.diff(moment()));
  }

  render() {
    const remaining = this.duration;
    const isReleased = remaining.asSeconds() <= 0;

    return (
      <div className="App">
        <video autoPlay loop id="video-background" playsInline>
          <source src={video} type="video/mp4" />
        </video>

        <a target="_tab" href="https://twitter.com/treytherobot" className="twitter">@treytherobot</a>

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
      </div>
    );
  }
}

export default App;

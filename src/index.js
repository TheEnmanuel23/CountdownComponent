import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class CountdownTimer extends React.Component {
  state = { hours: 0, minutes: 0, seconds: 0 };
  intervalHandle;

  componentWillMount = () => this.increase();

  increase = () => {
    this.setState(({ hours }) => ({ hours: hours + 1 }));
    this.intervalHandle = setInterval(this.tick, 1000);
  };

  tick = () => {
    const { firstDate, totalHoursMax } = this.props;

    const countDownDate = new Date(firstDate).getTime();
    const now = new Date().getTime();

    const distance = now - countDownDate;
    const elapsedHours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const elapsedMinutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const elapsedSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    const hours = totalHoursMax - elapsedHours;
    const minutes = 60 - elapsedMinutes;
    const seconds = 60 - elapsedSeconds;

    this.setState({ hours, minutes, seconds }, () => {
      if ((hours === 0) & (minutes === 0) & (seconds === 1)) {
        clearInterval(this.intervalHandle);
      }
    });
  };

  render() {
    return (
      <div>
        <span>{`${this.state.hours}h ${this.state.minutes}m ${
          this.state.seconds
        }s`}</span>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <CountdownTimer
        totalHoursMax={4}
        firstDate="2018-12-19T16:41:15.063+00:00"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

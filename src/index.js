import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class CountdownTimer extends React.Component {
  state = { totalHours: 4, hours: 0, minutes: 0, seconds: 0 };
  intervalHandle;

  componentWillMount = () => this.increase();

  increase = () => {
    this.setState(({ hours }) => ({ hours: hours + 1 }));
    this.setInterval = setInterval(this.other, 1000);
  };

  other = () => {
    const { firstDate, totalHours } = this.props;

    const countDownDate = new Date(firstDate).getTime();
    const now = new Date().getTime();

    const distance = now - countDownDate;
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.setState({
      hours: totalHours - hours,
      minutes: 60 - minutes,
      seconds: 60 - seconds
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

// get hours between start date and current date

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <CountdownTimer
        totalHours={120}
        firstDate="2018-12-19T16:41:15.063+00:00"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

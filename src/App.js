import React from "react";
import "./tailwind.generated.css";
import "./App.css";
import ChatBubble from "./components/ChatBubble";
import messages from "./messages.js";

class App extends React.Component {
  state = {
    currentTime: messages[0].date,
    timeRange: [0, 100],
    timePercentage: 100,
  };

  constructor(props) {
    super(props);
    this.chatContainerRef = React.createRef();
  }

  getTimeRange = () => {
    return [messages[0].date, messages[messages.length - 1].date];
  };

  // Take a percentage value, and return a unix timestamp
  getTimeFromPercentage = (time) => {
    const timeRange = this.state.timeRange;
    const period = timeRange[1] - timeRange[0];
    return timeRange[0] + period * (time / 100);
  };

  // Take a unix timestamp, and return as a percentage of the total range
  getTimeAsPercentage = (time, timeRange = false) => {
    timeRange = timeRange ? timeRange : this.state.timeRange;
    const period = timeRange[1] - timeRange[0];
    const timeElapsed = time - timeRange[0];
    return Math.floor(((timeElapsed > 0 ? timeElapsed : 1) / period) * 100);
  };

  handleTimeChange = (event) => {
    this.setState({
      currentTime: this.getTimeFromPercentage(event.target.value),
      timePercentage: parseInt(event.target.value),
    });

    // Jump to msot recent messages
    this.jumpToMostRecentMessage();
  };

  componentDidMount() {
    const timeRange = this.getTimeRange();
    this.setState({
      timeRange: timeRange,
      timePercentage: this.getTimeAsPercentage(
        this.state.currentTime,
        timeRange
      ),
    });
    this.jumpToMostRecentMessage();
  }

  jumpToMostRecentMessage = () => {
    // Jump to latest messages
    this.chatContainerRef.current.scrollTop = this.chatContainerRef.current.scrollHeight;
  };

  render() {
    return (
      <div className="App flex flex-col sm:flex-row">
        <div
          className="chat-container flex-grow sm:mr-auto"
          ref={this.chatContainerRef}
        >
          <div className="flex flex-col flex-grow">
            {messages
              .filter((m) => m.date <= this.state.currentTime)
              .map((m, index) => (
                <ChatBubble
                  content={m.content}
                  date={m.date}
                  own={m.own}
                  key={index}
                />
              ))}
          </div>
        </div>
        <div className="range flex-grow-0 flex-shrink-0 sm:flex-grow flex p-10 items-center justify-center">
          <div className="self-center w-full">
            <input
              className="w-full basis-full"
              type="range"
              min="0"
              max="100"
              step="4"
              onChange={this.handleTimeChange}
              value={this.state.timePercentage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

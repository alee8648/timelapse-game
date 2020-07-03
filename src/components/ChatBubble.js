import React, { Component } from "react";
import Moment from "react-moment";

class ChatBubble extends Component {
  constructor(props) {
    super(props);
    this.date = props.date;
  }

  render() {
    const calendarStrings = {
      lastDay: "[Yesterday at] LT",
      sameDay: "[Today] LT",
      nextDay: "[Tomorrow at] LT",
      lastWeek: "[last] dddd [at] LT",
      nextWeek: "dddd [at] LT",
      sameElse: "L",
    };

    return (
      <div
        className={`chat-bubble__wrapper${
          this.props.own ? " self-end" : " self-start"
        }`}
      >
        <div
          className={`chat-bubble${
            this.props.own ? " chat-bubble--own" : " chat-bubble--theirs"
          }`}
        >
          <div>{this.props.content}</div>
        </div>
        <div
          className={`date pl-2 text-xs${
            this.props.own ? " text-right" : " text-left"
          }`}
        >
          <Moment unix calendar={calendarStrings}>
            {this.props.date}
          </Moment>
        </div>
      </div>
    );
  }
}

export default ChatBubble;

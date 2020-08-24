import React from 'react'
import './Message.css';

function Message({ message, timestamp, user, userImage }) {  // this is how the message collection was defined, so the destructuring is like this.
  return (
    <div className="message">
      <img src={userImage} alt=""/>
      <div className="message__info">
        <h4>
          {user} <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>  {/* so we are checking that the firebase provided us the timestamp and then we will convert it to JS Date object and then we convert that datee object into UTC string format */}
        </h4>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message

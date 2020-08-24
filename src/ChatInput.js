import React, { useState } from 'react';
import './ChatInput.css';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();
  const sendMessage = e => {
    e.preventDefault();  // so that it doesn't refreshes the page
    if(channelId) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),  // we will be storing the server timestamp not the local time.
        user: user.displayName,
        userImage: user.photoURL,
      })
    }
  }
  return (
    <div className='chatInput'>
      <form>
        <input
          placeholder={`Message #${channelName}`}
          onChange={e => setInput(e.target.value)}  // this will be fired everytime the input field changes
        />
        <button type="submit" onClick={sendMessage}>SEND</button>
      </form>
    </div>
  )
}

export default ChatInput

import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from './Message';
import ChatInput from './ChatInput';
import db from './firebase';

function Chat() {
  const { roomId } = useParams();  // we are padding roomId in the form of link (:roomId), we are get it out using useParams provided by react-router-dom. You can even pull rooId from props.match.params
  // everywheree you see 'use' in front of words, those are hook. That is the standards for naming a hook.
  // hooks can only be used inside a function based components not inside a class based components.
  // arn't you in love with react hook till now. Do check out usehooks.com to know more about react hooks.
  const [roomDetails, setRoomDetails] = useState();  // this is the normal convention to create state in a functional component in react, its default value is set to null. This states will be populated with room details whenever the useEffect hook runs.
  const [roomMessages, setRoomMessages] = useState([]);  // we are initialling the roomMessage as an array as it is going to store an array of all the messages the message collection in that room.

  useEffect(() => {  // this code will run when the page loads for the first time and when ever the roomId changes as it is passed as a dependency in the square bracket.
    if(roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {  // when ever content of roomId changes a snapshot will be send
        setRoomDetails(snapshot.data())  // setRoomDetails is used to set roomDetails state that is been created at line 14. The data inside the snapshot will go into the roomDetails.
      })
    }
    db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>  // we are getting the message collection from the roomId doc inside the rooms collection according to their time in ascending order, and mapping them to the roomMessages state.
      setRoomMessages(
        snapshot.docs.map(doc => doc.data())  // so we are looping through the content in the room database and 
      )
    )
  }, [roomId])
  return (
    <div className='chat'>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails?.name}</strong>  {/* the '?' id used to protect it with a optional, if roomDetails was not there. It was introduced  in ES6, called optional chaining, once you add that is like a try catch but instantly. If roomDetails was not defined than it will put null in there. We can even nest it like room?.info?.data */}
            <StarBorderOutlinedIcon/>
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon/> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {/* In here we are going to have a bunch of <Messages ... /> component that will be mapped out from the roomMessages state. */}
        {roomMessages.map(({ message, timestamp, user, userImage }) => (  // we destructured  the message that we received from the state roomMessage.
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  )
}

export default Chat

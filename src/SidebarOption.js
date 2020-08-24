import React from 'react';
import  './SidebarOption.css';
import { useHistory } from 'react-router-dom';
import db from './firebase';

function SidebarOption({ Icon, title, id, addChannelOption }) {  {/* destructuring the props that we receve to get the Icon component nad the title from the prop */}

  const history = useHistory();
  const selectChannel = () => {  // we do not want to pull all channel at one as they may contain 1000s of messages
    if(id) {  // id will be ther if we came from the database
      history.push(`/room/${id}`);  // it is used when we are will to programatically change the URL. In web-dev whenever we are going back or forward a page by clicking a link we are modifing something called "history". We can pull the history out using hook called useHistory().
      // what we are going to do in this case, is that when we click on the icon (channel) we are going to push the next page to history, i.e. we going to redirect.
    } else {
      history.push(title);
    }
  };

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name');  // what ever name the user enters in the prompt will be stored inside channelName.
    if(channelName) {  // if statement is used because someone can just leave the prompt blank, then we do not want this function to run.
      db.collection("rooms").add({  // this will add a new document to the rooms collection.
        name: channelName,  // this will give the name key to the added document.
      })
    }
  };

  return (
    <div className="sidebarOption" onClick={addChannelOption? addChannel: selectChannel}>  {/* when we click this div and we have the addChannelOption then we are going to fire the addChannel else we will fire selectChannel. */}
      {Icon && <Icon className="sidebarOption__icon"/>}  {/* this statement says to render Icon only is Icon is passed in as prop */}
      {Icon? (
        <h3>{title}</h3>
      ):(
        <h3 className="sidebarOption__channel"><span className="sidebarOption__hash">#</span>{title}</h3>
      )}  {/* If you are passing me an icon than do this else do this, if you pass the icon tham it is option else it id the slack channel*/}
    </div>
  );
}

export default SidebarOption;

import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarOption from './SidebarOption';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
  const [{user}] = useStateValue();

  // to set a variable inside react we use states, here we will be using useState hook
  const [channels, setChannels] = useState([]);  // initializing the channel as empty array


  // useEffect is a react hook, this will run the code inside of it ONCE when the the components load, and after that only when the stuffs(variables) in side the square brackets changes (in this case it is empty so it runs only once). The stuffs(variables) inside the square brackets are called dependencies
  useEffect(() => {
    // when it loads we are going to get inside the rooms collection. onSnapshot is basically telling to go and get a live snapshot(picture) of the database collection, and when ever it changes  it give us a new snapshot(picture), so its keeps getting fired everytime something in the database changes, thus we call it real time
    db.collection('rooms').onSnapshot(snapshot => (  // are going through each of the snapshot we are setting the channels (setChannels, which was used above in useState.) by going through each of the snapshot and go through each of the docs (docs is what snapshot give us back in the form af an object), map(JS function) through them and return the object that is in the curly barces(id and name)
      setChannels(
        snapshot.docs.map(doc => ({  // we are using arrow function here so we didn't used return keyword to return the object of id and name.
          id: doc.id,
          name: doc.data().name
        }))  // at the end we are going to have an  array of the object in the channels (state/variable).
      )
    ))
  }, [])


  return (
    <div className="sidebar">
      <div className="sidebar__header">  {/* this part will show the name and user id of the logged in user */}
        <div className="sidebar__info">
          <h2>Clever Programmer</h2>
          <h3>
            <FiberManualRecordIcon/>  {/* online icon */}
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon/>
        {/* here instead of using a long sidebar options we will create broken sidebar options which will stack over one another making a complete sidebar */}
      </div>
        <SidebarOption Icon={InsertCommentIcon} title="Threads"/>  {/* the Icon is capital as we are going to pass component as the prop. The icon was imported above from material ui */}
        <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
        <SidebarOption Icon={DraftsIcon} title="Saved items"/>
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser"/>
        <SidebarOption Icon={PeopleAltIcon} title="People & user groups"/>
        <SidebarOption Icon={AppsIcon} title="Apps"/>
        <SidebarOption Icon={FileCopyIcon} title="File browser"/>
        <SidebarOption Icon={ExpandLessIcon} title="Show less"/>
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title="Channels"/>
        <hr />
        <SidebarOption addChannelOption Icon={AddIcon} title="Add Channel"/>  {/* addChannelOption is going to a prop which will when present will make the component to do come stuff. Here we will use to have a popup for adding channel. To be used in sidebarOption.js */}

        {/* Connect to database and list all the channels */}
        {channels.map(channel => (
          <SidebarOption title={channel.name} id={channel.id}/>  // here we didn't passed the Icon and while using map we react always asks for unique id
        ))}

    </div>
  )
}

export default Sidebar

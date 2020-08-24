import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat'

function App() {
  // const [user, setUser] = useState(null);  // this state will be used for user authentication. Instead of this we will be using the below method.
  const [{user}, dispatch] = useStateValue()  // After setting up reducer and StateProvider what we can do now is to pull the user from the data layer. useStateValue is from StateProvider.js file last line. This line will provide us the state and we are destructuring user from the state using {user} in the square brackets.
  return (
    <div className="app">
      <Router>
        {/* is we don't have a user then we will be showing our log in page else we will show  the content of the page. */}
        {!user? (
          <Login />
        ): (
          <>  {/* this is called fragment, as in react we need to have every JSX tags wrapped inside a single JSX tag */}
            <Header />
            <div className="app__body">
              <Sidebar />
              <Switch>  {/* it checks the route we are in, and based on the route it loads what it should load */}
                <Route path="/room/:roomId">  {/* :roomId is basically a wild card, anything can be in place of that */}
                  <Chat />
                </Route>
              </Switch>
              {/* React-Router --> for loading appropriate chat screen */}
            </div>
          </>
        )}
        
      </Router>
      

    </div>
  );
}

export default App;

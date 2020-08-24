// This will be used as a state provider. i.e. here we will be setting up our state provider.

import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();  // this will help us wrap our app with the data layer, which we can push information into, and also pull information from it.

export const StateProvider = ({ reducer, initialState, children }) => (  // 
  <StateContext.Provider value={useReducer(reducer, initialState)}> {/* the use reducer takes in some kind of reducer and some kind of state. What reducer does is that it listions to any kind of actions we shot at that data layer. So if we say to the data layer here is a user, set the user the reducer is where that listioning happens for that events. The initialState is just gonna be what the data layer looks like before we actually go ahead and do anything to it. */}
    {children}  {/* this is going to be our entire application and it is encapsulated inside our Provider, which is etentially like a data layer. What our aim is to push the user in side the data layer and pull it out where ever we require it. We can prety musch store any thing inside our data layer. */}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);  // This line of code will allow to access the data layer. useStateValue is our own hook, it allows us to use state value, a value from the data layer. useContext is telling to go ahead and grab some values from the data layer.
// This is basically going to listen to any action which gets fired into the data layer.
// Context API or Redux both like a bucket of all the data which can be accissed by us from any where in the entire project. Which is far better than prop drilling, in which we will have to drill the data to its child component for it to access it.


export const initialState = {
  user: null,
};

export const actionTypes = {  // creating our action
  SET_USER: "SET_USER",
};

// The state is what the datalayer looks like and action is what we are trying to do to the data layer, are we trying to push the information in or are we trying to set the user.
// When we dispatch an event to the data layer, it will have a type and it will have some kind of payload, in this case it will be user.
const reducer = (state, action) => {
  console.log(action);  // it is a good thin to console the action to check what is happening.

  switch(action.type) {  // now we will be checking the type of the action provided to us.
    case actionTypes.SET_USER:
      return{  // when ever we get the actiontype to be SET_USER, we should return what ever the state currently look like, and then we modifu the user.
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}

export default reducer;  // as we want to use it outside.
// Now to wrap the whole application with it, so that we can use it from any where. In Index.js, wrap the whole <App/> with <StateProvider>, The StateProvider is from stateReducer.js
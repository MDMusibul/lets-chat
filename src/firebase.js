import firebase from 'firebase' // install using npm i firebase, and nothing else was installed to set up the firebase database
// firestore is a hybread between noSQL and SQL database, firebase realtime is just like a big JSON tree (noSQL database), in it we can't do stuff like searching. But in firestore we can search, there is indexing, it is faster. Firestore is also a real time database.

const firebaseConfig = {
  apiKey: "AIzaSyCG7s0II_lm6LZrkQJFCViSjc4X3jvXPRQ",
  authDomain: "chat-app-c9cae.firebaseapp.com",
  databaseURL: "https://chat-app-c9cae.firebaseio.com",
  projectId: "chat-app-c9cae",
  storageBucket: "chat-app-c9cae.appspot.com",
  messagingSenderId: "95272107377",
  appId: "1:95272107377:web:5e56329754416cd6e6cad0",
  measurementId: "G-FT2RN7FENY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);  // this line will connect to the firebase
const db = firebaseApp.firestore();  // to get the access to our database from any other file, any other plase
const auth = firebase.auth();  // prepairing our authentication module
const provider = new firebase.auth.GoogleAuthProvider();  // this to get google authentication to the application

export { auth, provider };  // as there are going to be used few times (in Login page) so we will use named export here. [import { auth, provider } from './firebase']  (import name must be same)
export default db;  // we will be exporting db as default as we will be using it everywhere. [import database from './firebase']  (import name can be different)
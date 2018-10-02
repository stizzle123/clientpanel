import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

import firebase from "firebase";
import "firebase/firestore";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsOLRaXd2bNRxbBQYSsgjDkzejWsZdaaE",
  authDomain: "reactclientpanel-d69b3.firebaseapp.com",
  databaseURL: "https://reactclientpanel-d69b3.firebaseio.com",
  projectId: "reactclientpanel-d69b3",
  storageBucket: "reactclientpanel-d69b3.appspot.com",
  messagingSenderId: "664570439093"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// Initialize Firebase config
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create InitialState
const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

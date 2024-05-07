import firebase from "firebase/compat/app"; //core
import "firebase/compat/firestore"; //import any other fetcher we want

const firebaseConfig = {
  apiKey: "AIzaSyCH1z107ZXRdKq3OXTk2J6XnvcxqlEg2Q4",
  authDomain: "simple-recipe-app-80ed4.firebaseapp.com",
  projectId: "simple-recipe-app-80ed4",
  storageBucket: "simple-recipe-app-80ed4.appspot.com",
  messagingSenderId: "256647110711",
  appId: "1:256647110711:web:eea3d1b0ce812da4229fb2",
};

//init firebase

firebase.initializeApp(firebaseConfig) //conect to our firebase backend

//init services
const projectFirestore = firebase.firestore() 

export {projectFirestore}
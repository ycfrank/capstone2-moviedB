import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDfXoixjRSFmxRIi1N0FlpyVXyfK9cMSmE",
  authDomain: "fir-auth-272d7.firebaseapp.com",
  databaseURL: "https://fir-auth-272d7.firebaseio.com",
  projectId: "fir-auth-272d7",
  storageBucket: "fir-auth-272d7.appspot.com",
  messagingSenderId: "22862524086",
  appId: "1:22862524086:web:1cd6d9c2e844588801c017",
  measurementId: "G-ZFWZV2DDNX",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();

export default app;

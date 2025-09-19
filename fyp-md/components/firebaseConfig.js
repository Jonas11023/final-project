// firebaseConfig.js
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAETQegQIzFwWlO4_aQ-2dKa3kmAQuBk-M",
  authDomain: "flood-response-app.firebaseapp.com",
  projectId: "flood-response-app",
  storageBucket: "flood-response-app.appspot.com",
  messagingSenderId: "297285448541",
  appId: "1:297285448541:web:db351f1ba5fc229757aeb4",
  measurementId: "G-RN9HS36W1K"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;

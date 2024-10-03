// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import {getAnalytics} from 'firebase/analytics'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzYJuyinhW5AC-zyYqArCF0l9PA5oAUBA",
  authDomain: "eventapp-ceb2c.firebaseapp.com",
  projectId: "eventapp-ceb2c",
  storageBucket: "eventapp-ceb2c.appspot.com",
  messagingSenderId: "305863087536",
  appId: "1:305863087536:web:88e40ca93498e0ac863275"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {auth , analytics , firestore , storage }

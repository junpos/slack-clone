import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDiD24mMm8oFhq8ygKHn4HcCPawNxfYCBY",
    authDomain: "slack-f8208.firebaseapp.com",
    projectId: "slack-f8208",
    storageBucket: "slack-f8208.appspot.com",
    messagingSenderId: "185713489368",
    appId: "1:185713489368:web:e00424ca0381d22e132ead",
    measurementId: "G-WECFG3RTJJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

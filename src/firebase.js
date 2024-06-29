import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7bR5S2bCzOhFwJgeN_PXqjL5X8zwO-mw",
    authDomain: "realtime-to-do-list-app.firebaseapp.com",
    projectId: "realtime-to-do-list-app",
    storageBucket: "realtime-to-do-list-app.appspot.com",
    messagingSenderId: "29696643791",
    appId: "1:29696643791:web:7d926dc594aa72d81c9dba",
    measurementId: "G-0QMSGPYP1P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

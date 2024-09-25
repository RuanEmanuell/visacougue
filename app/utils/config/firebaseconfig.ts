import { initializeApp } from 'firebase/app';
import { initializeAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBTaYKxdwGRI5o1S2W5KKJxqJJPUVPWOdo",
    authDomain: "visacougue.firebaseapp.com",
    projectId: "visacougue",
    storageBucket: "visacougue.appspot.com",
    messagingSenderId: "132164329750",
    appId: "1:132164329750:web:75aa42403c4e1a4a8ab037",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);

const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, googleProvider, db, storage };

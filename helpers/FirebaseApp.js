import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyD6QfjZ3kiDgfDBJ3k0OoS6CSjwCVysM_A',
    authDomain: 'wastenot-4f8dd.firebaseapp.com',
    databaseURL: 'https://wastenot-4f8dd.firebaseio.com',
    projectId: 'wastenot-4f8dd',
    storageBucket: 'wastenot-4f8dd.appspot.com',
    messagingSenderId: '755864780516',
    appId: '1:755864780516:android:443a723b6941f0b2ffb6f1',
    measurementId: 'G-T70SC3V0QR'
};
  
class FirebaseApp {
    
    constructor() {
        this._instance = initializeApp(firebaseConfig);
    }

    getInstance = () =>  {
        return this._instance;
    }

    auth = () => {
        return getAuth();
    }

    firestore = () => {
        return getFirestore(this._instance);
    }
}

export default FirebaseApp;
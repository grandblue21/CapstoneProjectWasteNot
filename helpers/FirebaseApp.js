import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
        
        /* this._authInitialized = false;

        // Initialize Firebase Auth with AsyncStorage for persistence if not already initialized
        if (!this._authInitialized) {
            initializeAuth(this._instance, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage),
            });
            this._authInitialized = true;
        } */
    }

    getInstance = () =>  {
        return this._instance;
    }

    auth = () => {
        return getAuth(this._instance);
    }

    firestore = () => {
        return getFirestore(this._instance);
    }
}

export default FirebaseApp;
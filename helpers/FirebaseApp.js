import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getFirestore, addDoc, collection, getDoc, getDocs, updateDoc, query, where, limit  } from 'firebase/firestore';

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
        return getAuth(this._instance);
    }

    firestore = () => {

        if (!this._firestore_instance) {
            this._firestore_instance = getFirestore(this._instance);
        }

        return this._firestore_instance;
    }

    db = {

        insert: async (document, values) => {

            try {

                // Add Document
                const ref = await addDoc(collection(this.firestore(), document), values);

                return ref;
                
            } catch (error) {
                console.log(error);
            }

            return false;
        },

        get: async (document, filter = null, numberOfData = 0) => {

            try {
                
                const q = query(collection(this.firestore(), document), filter ? where(filter.column, filter.comparison, filter.value) : null, numberOfData ? limit(numberOfData) : null);

                const dataSnapshot = await getDocs(q);

                let data = [];

                dataSnapshot.forEach((iteration) => data.push({ ...iteration.data(), id: iteration.id }));

                return limit > 1 && data.length > 0 ? data : (data.length > 0 ? data[0] : []);
            }
            catch (error) {
                console.log(error);
            }

            return false;
        },

        update: async (document, values, filter) => {

            try {
                
                const ref = doc(this.firestore(), document, filter);

                await updateDoc(ref, values);

                return true;

            } catch (error) {
                console.log(error);
            }

            return false;
        }
        

    }

    session = {

        set: async (key, value) => {

            try {

                await ReactNativeAsyncStorage.setItem(key, value);

                return key;

            } catch (error) {
                console.log('Session Set Error: ', error);
            }

            return false;
        },

        get: async (key) => {

            try {
                
                const item = await ReactNativeAsyncStorage.getItem(key);

                return item;

            } catch (error) {
                console.log('Session Get Error: ', error);
            }

            return false;
        },

        clear: async () => {

            try {

                await ReactNativeAsyncStorage.clear();

                return true;
                
            } catch (error) {
                console.log('Session Clear Error: ', error);
            }

            return false;
        }

    }
}

export default FirebaseApp;
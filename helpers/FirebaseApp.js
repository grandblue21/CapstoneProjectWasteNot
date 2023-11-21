import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

        insert: async (collectionName, values) => {

            try {

                // Add Document
                const ref = await addDoc(collection(this.firestore(), collectionName), values);

                return ref;
                
            } catch (error) {
                console.log(error);
            }

            return false;
        },

        gets: async (collectionName, filter = null, numberOfData = 0) => {

            try {
                
                const q = query(collection(this.firestore(), collectionName), filter ? where(filter.column, filter.comparison, filter.value) : null, numberOfData ? limit(numberOfData) : null);

                const dataSnapshot = await getDocs(q);

                let data = [];

                dataSnapshot.forEach((iteration) => data.push({ ...iteration.data(), id: iteration.id }));

                return data;
            }
            catch (error) {
                console.log(error);
            }

            return false;
        },

        get: async (collectionName, filter) => {

            try {

                const q = query(collection(this.firestore(), collectionName), where(filter.column, filter.comparison, filter.value), limit(1));
                
                const docSnapshot = await getDocs(q);

                // Check there are docs
                if (docSnapshot.docs.length > 0) {
                    return { ...docSnapshot.docs[0].data(), id: docSnapshot.docs[0].id };
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
            }

            return false;
        },

        update: async (collectionName, values, filter) => {

            try {
                
                const ref = doc(this.firestore(), collectionName, filter);

                await updateDoc(ref, values);

                return true;

            }
            catch (error) {
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
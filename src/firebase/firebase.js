import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => console.log(`Firebase Persistance error : ${error.code}`));

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export { auth, db, storage, usersCollection, songsCollection, commentsCollection };

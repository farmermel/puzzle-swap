import * as firebase from 'firebase';
import { firebaseKey,
  fbAuthDomain,
  fbdbUrl,
  fbProjId,
  fbMessagingSenderId } from '../helpers/apiKeys';

const config = {
  apiKey: firebaseKey,
  authDomain: fbAuthDomain,
  databaseURL: fbdbUrl,
  projectId: fbProjId,
  storageBucket: "",
  messagingSenderId: fbMessagingSenderId
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const db = firebase.database();

export {
  db,
  auth,
};
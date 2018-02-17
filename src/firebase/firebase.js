import * as firebase from 'firebase';
import { firebaseKey,
  fbAuthDomain,
  fbdbUrl,
  fbProjId,
  fbMessagingSenderId,
  storageBucket } from '../helpers/apiKeys';

const config = {
  apiKey: firebaseKey,
  authDomain: fbAuthDomain,
  databaseURL: fbdbUrl,
  projectId: fbProjId,
  storageBucket: storageBucket,
  messagingSenderId: fbMessagingSenderId
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const db = firebase.database();

const store = firebase.storage();

export {
  db,
  auth,
  store
};
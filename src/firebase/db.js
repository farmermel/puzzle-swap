import { db } from './firebase';

export const doCreateUser = (id, username, email) => 
  db.ref(`users/${id}`).set({
    username,
    email
});

export const onceGetUsers = () => 
  db.ref('users').once('value');

export const getFirebaseKey = childNode => 
  db.ref().child(childNode).push().key;

export const postUpdate = updates => 
  db.ref().update(updates);
import { db } from './firebase';

export const doCreateUser = (id, username, email) => 
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const getOnce = path =>
  db.ref(path).once('value');

export const getFirebaseKey = path => 
  db.ref().child(path).push().key;

export const postUpdate = updates => 
  db.ref().update(updates);

export const watchData = watchNode => 
  db.ref(watchNode);

export const deleteData = path => 
  db.ref().child(path).remove()

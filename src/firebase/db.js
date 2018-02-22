import { db } from './firebase';

export const doCreateUser = (id, username, email) => 
  db.ref(`users/${id}`).set({
    username,
    email
  });

// export const onceGetUsers = () => 
//   db.ref('users').once('value');

export const getOnce = path =>
  db.ref(path).once('value');

export const getFirebaseKey = childNode => 
  db.ref().child(childNode).push().key;

export const postUpdate = updates => 
  db.ref().update(updates);

export const watchData = watchNode => 
  db.ref(watchNode);

// export const getData = watchNode => 
//   watchData(watchNode).on('value', (snapshot) => {
//     return snapshot.val()
//   })
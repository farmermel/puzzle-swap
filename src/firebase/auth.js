import { auth } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) => 
  auth.signInWithEmailAndPassword(email, password);

export const onAuthStateChanged = user => 
  auth.onAuthStateChanged(user);

export const doSignOut = () => 
  auth.signOut();
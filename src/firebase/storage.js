import { storage } from './firebase';

export const getStoreRef = path =>
  storage.ref().child(path);

export const putInStore = (ref, blob) =>
  ref.put(blob);
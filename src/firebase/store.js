import { store } from './firebase';

export const getStoreRef = path =>
  store.ref().child(path)

export const putInStore = (ref, blob) =>
  ref.put(blob)
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

export const uploadFile = async (file, path) => {
  const fileRef = ref(storage, path);
  const snap = await uploadBytes(fileRef, file);
  return await getDownloadURL(snap.ref);
};

export const deleteFile = async (path) => {
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
};

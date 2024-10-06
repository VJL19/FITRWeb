import {
  FirebaseStorage,
  FullMetadata,
  StorageReference,
  deleteObject,
  getMetadata,
  ref,
} from "firebase/storage";

const firebaseRef = (
  storage: FirebaseStorage,
  url?: string | undefined
): StorageReference => {
  return ref(storage, url);
};

const deleteFirebaseObject = (ref: StorageReference): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await deleteObject(ref);
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
};
const getFirebaseMetadata = (ref: StorageReference): Promise<FullMetadata> => {
  return new Promise<FullMetadata>(async (resolve, reject) => {
    try {
      const metaData = await getMetadata(ref);
      return resolve(metaData);
    } catch (err) {
      return reject(err);
    }
  });
};

export { firebaseRef, deleteFirebaseObject, getFirebaseMetadata };

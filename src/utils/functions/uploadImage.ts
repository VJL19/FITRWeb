import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "src/global/firebaseConfig";
import { IMAGE_VALUES } from "../enums/IMAGE_VALUES";
export const uploadImage = async (
  uri: File | string | undefined,
  folderName: string,
  fileType: string,
  loading: boolean,
  setLoading: (arg: boolean) => void
) => {
  try {
    if (uri === undefined) return IMAGE_VALUES.DEFAULT_VALUE;
    const response = await fetch(uri);
    const blob = await response.blob();
    setLoading(true);

    const storageRef = ref(storage, `${folderName}/${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, uri);

    const snapshot = await uploadBytes(storageRef, uri);
    const url = await getDownloadURL(snapshot.ref);

    return url;

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      //if the upload image is error
      (error) => {
        console.log("Image upload error!", error);
      }
      // //if the upload image is sucess
      // () => {
      //   getDownloadURL(uploadTask.snapshot.ref)
      //     .then(async (downloadUrl) => {
      //       setImageUploaded(true);
      //       setImage(downloadUrl);

      //       const arg = {
      //         ...accountData,
      //         ProfilePic: downloadUrl,
      //       };
      //       changeAccount(arg);
      //       console.log("Image available at!", downloadUrl);
      //     })
      //     .catch((err) => console.log("error", err));
      // }
    );
    await uploadTask;

    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  } catch (err) {
    console.log("error", err);
  } finally {
    setLoading(false);
  }
};

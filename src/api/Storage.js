import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 } from "uuid";

//Запрос на добавление данных в хранилище
export const AddAvatar = async (file, name) => {
  try {
    const nameFile = v4() + name;
    const fileRef = ref(storage, `avatars/${nameFile}.webp`);
    const responseFile = await uploadBytes(fileRef, file);
    const respURL = await getDownloadURL(responseFile.ref);
    return respURL;
  } catch (error) {
    console.error(error);
  }
};
//запрос на удаление файлов в хранилище
export const DelAvatar = async (url) => {
  try {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  } catch (error) {
    console.error(error);
  }
};

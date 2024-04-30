import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  addDoc,
  setDoc,
  doc,
  getDoc,
  get,
} from "firebase/firestore";

import { db } from "../config/firebase";
const reviwsCollectionRef = collection(db, "reviws");

//Запрос на изъятия всех отзывов
export const getReviwsList = async () => {
  try {
    const dataReviws = await getDocs(reviwsCollectionRef);
    const filteredDataReviws = dataReviws.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataReviws;
  } catch (error) {
    console.error(error);
  }
};

//Запрос на изъятия отзывов конректного юзера
export const getReviwsUser = async (user_ID) => {
  try {
    const reviwsUser = await getDocs(
      query(reviwsCollectionRef, where("user_ID", "==", user_ID))
    );
    const filteredDataReviwsUser = reviwsUser.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataReviwsUser;
  } catch (error) {
    console.error(error);
  }
};
//Запрос на изъятия отзывов конректного магазина
export const getReviwsPlace = async (place) => {
  try {
    const reviwsUser = await getDocs(
      query(reviwsCollectionRef, where("place", "==", place))
    );
    const filteredDataReviwsUser = reviwsUser.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataReviwsUser;
  } catch (error) {
    console.error(error);
  }
};

//Запрос на добавление отзыва
export const AddReviwsList = async (dataReviws) => {
  try {
    await addDoc(reviwsCollectionRef, dataReviws);
  } catch (error) {
    console.error(error);
  }
};
//Запрос на изменении состояния "просмотрено" в отзыве
export const SetReviwsList = async (id, dataReviws) => {
  try {
    await setDoc(doc(db, "reviws", id), dataReviws);
  } catch (error) {
    console.error(error);
  }
};
//Запрос на удаление отзыва
export const DelReviwsList = async (id) => {
  try {
    await deleteDoc(doc(db, "reviws", id));
  } catch (error) {
    console.error(error);
  }
};

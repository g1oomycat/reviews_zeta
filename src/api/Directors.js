import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../config/firebase";
const directorsCollectionRef = collection(db, "directors");

//Запрос на изъятия данных всех директоров
export const getDirectorsList = async () => {
  try {
    const dataDirectors = await getDocs(
      query(directorsCollectionRef, orderBy("date", "desc"))
    );
    const filteredDataDirectors = dataDirectors.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataDirectors;
  } catch (error) {
    console.error(error);
  }
};

//Запрос на изъятия конкретного директора по id
export const getDirector = async (targetArticle) => {
  try {
    const directorDocSnapshot = await getDoc(
      doc(directorsCollectionRef, targetArticle)
    );
    console.log(directorDocSnapshot);
    if (directorDocSnapshot.exists()) {
      return directorDocSnapshot.data();
    } else {
      throw new Error("Пользователь с указанным ID не найден");
    }
  } catch (error) {
    alert(error);
    console.error(error);
  }
};

//Запрос на изъятия директора конректного магазина
export const getDirectorFromAtribute = async (name, data) => {
  try {
    const placeDirector = await getDocs(
      query(directorsCollectionRef, where(name, "==", data))
    );
    const filteredDataPlaceDirector = placeDirector.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataPlaceDirector;
  } catch (error) {
    console.error(error);
  }
};

//Запрос на добавление директора
export const AddDirector = async (director) => {
  try {
    await addDoc(directorsCollectionRef, director);
  } catch (error) {
    console.error(error);
  }
};

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
} from "firebase/firestore";
import { getReviwsUser } from "./FBreviws";

import { db } from "../config/firebase";
const usersCollectionRef = collection(db, "users");

//Запрос на изъятия данных всех юзеров
export const getUsersList = async () => {
  try {
    const dataUsers = await getDocs(usersCollectionRef);
    const filteredDataUsers = dataUsers.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataUsers;
  } catch (error) {
    console.error(error);
  }
};

//Запрос на изъятия конкретного юзера
export const getUser = async (targetArticle) => {
  try {
    const userDocSnapshot = await getDoc(
      doc(usersCollectionRef, targetArticle)
    );

    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data();
    } else {
      console.log("Пользователь с указанным ID не найден");
    }
  } catch (error) {
    console.error(error);
  }
};
//Запрос на мзменение оценки конкретного юзера
export const setGradeAndReviewsUser = async (user_ID) => {
  try {
    const reviwsList = await getReviwsUser(user_ID);
    const absGrade = (
      reviwsList.reduce((sum, item) => sum + item.grade, 0) / reviwsList.length
    ).toFixed(1);

    await updateDoc(doc(db, "users", user_ID), {
      rating: absGrade,
      quantityReview: reviwsList.length,
    });
  } catch (error) {
    console.error(error);
  }
};
//Запрос на изъятия юзера конректного магазина
export const getUserFromPlace = async (place) => {
  try {
    const placeUser = await getDocs(
      query(usersCollectionRef, where("place", "==", place))
    );
    const filteredDataPlaceUser = placeUser.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataPlaceUser;
  } catch (error) {
    console.error(error);
  }
};

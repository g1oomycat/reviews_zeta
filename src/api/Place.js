import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../config/firebase";
const placeCollectionRef = collection(db, "place");

//Запрос на изъятия всех мест
export const getPlaceList = async () => {
  try {
    const dataPlace = await getDocs(placeCollectionRef);
    const filteredDataPlace = dataPlace.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataPlace;
  } catch (error) {
    console.error(error);
  }
};
//Запрос на изъятия конкретное место
export const getCorrectPlace = async (place) => {
  try {
    const correctPlace = await getDocs(
      query(placeCollectionRef, where("place", "==", place))
    );
    const filteredDataCorrectPlace = correctPlace.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredDataCorrectPlace[0];
  } catch (error) {
    console.error(error);
  }
};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const createUser = async (email, password) => {
  try {
    const responce = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return responce;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};
export const signInUser = async (email, password) => {
  try {
    const responce = await signInWithEmailAndPassword(auth, email, password);
    return responce;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

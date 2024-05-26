import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { deleteReviewsByAtribute, getReviwsByAtribute } from './Reviws';

import { db } from '../config/firebase';
import { DelAvatar } from './Storage';
const usersCollectionRef = collection(db, 'users');

//Запрос на изъятия данных всех юзеров
export const getUsersList = async () => {
	try {
		const dataUsers = await getDocs(
			query(usersCollectionRef, orderBy('date', 'desc'))
		);
		const filteredDataUsers = dataUsers.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));
		return filteredDataUsers;
	} catch (error) {
		console.error(error);
	}
};

//Запрос на изъятия конкретного юзера
export const getUser = async id => {
	try {
		const userDocSnapshot = await getDoc(doc(usersCollectionRef, id));
		if (userDocSnapshot.exists()) {
			let dataUser = { ...userDocSnapshot.data(), id: userDocSnapshot.id };
			return dataUser;
		} else {
			throw new Error('Пользователь с указанным ID не найден');
		}
	} catch (error) {
		console.error(error);
	}
};

//Запрос на изменение оценки конкретного юзера
export const setGradeAndReviewsUser = async user_ID => {
	try {
		const reviwsList = await getReviwsByAtribute('user_ID', user_ID);
		let absGrade = reviwsList.length
			? (
					reviwsList.reduce((sum, item) => sum + item.grade, 0) /
					reviwsList.length
			  ).toFixed(1)
			: 0;
		await updateDoc(doc(db, 'users', user_ID), {
			rating: parseFloat(absGrade),
			quantityReview: reviwsList.length,
		});
	} catch (error) {
		console.error(error);
	}
};

export const getUserFromAtributeWithoutFilter = async (key, value) => {
	try {
		const usersList = await getDocs(
			query(usersCollectionRef, where(key, '==', value))
		);

		return usersList;
	} catch (error) {
		console.error(error);
	}
};
//Запрос на изъятия юзера по атрибуту
export const getUserFromAtribute = async (key, value) => {
	try {
		const placeUser = await getDocs(
			query(usersCollectionRef, where(key, '==', value))
		);
		const filteredDataPlaceUser = placeUser.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));
		return filteredDataPlaceUser;
	} catch (error) {
		console.error(error);
	}
};

//Запрос на добавление юзера
export const AddUser = async user => {
	console.log(user);
	try {
		const res = await addDoc(usersCollectionRef, user);
		return res;
	} catch (error) {
		console.error(error);
	}
};

//Запрос на удаление ЮЗЕРА
export const DelUser = async data => {
	try {
		if (data.foto) {
			await Promise.all([
				deleteDoc(doc(db, 'users', data.id)),
				deleteReviewsByAtribute('user_ID', data.id),
				DelAvatar(data.foto),
			]);
		} else {
			await Promise.all([
				deleteDoc(doc(db, 'users', data.id)),
				deleteReviewsByAtribute('user_ID', data.id),
			]);
		}
	} catch (error) {
		console.error(error);
	}
};

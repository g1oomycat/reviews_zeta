import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	where,
	writeBatch,
} from 'firebase/firestore';

import { db } from '../config/firebase';
const reviwsCollectionRef = collection(db, 'reviws');

//Запрос на изъятия всех отзывов
export const getReviwsList = async () => {
	try {
		const dataReviws = await getDocs(
			query(reviwsCollectionRef, orderBy('date', 'desc'))
		);
		const filteredDataReviws = dataReviws.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));
		return filteredDataReviws;
	} catch (error) {
		console.error(error);
	}
};

//Запрос на изъятия отзывов по конертному атрибуту
export const getReviwsByAtribute = async (name, atribute) => {
	try {
		const reviwsUser = await getDocs(
			query(
				reviwsCollectionRef,
				where(name, '==', atribute),
				orderBy('date', 'desc')
			)
		);

		const filteredDataReviwsUser = reviwsUser.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));
		return filteredDataReviwsUser;
	} catch (error) {
		console.error(error);
	}
};

//Запрос на добавление отзыва
export const AddReviwsList = async dataReviws => {
	try {
		await addDoc(reviwsCollectionRef, dataReviws);
	} catch (error) {
		console.error(error);
	}
};

//Запрос на удаление 1 отзыва
export const DelReviwsList = async id => {
	try {
		await deleteDoc(doc(db, 'reviws', id));
	} catch (error) {
		console.error(error);
	}
};

export const getReviewsByAtributeWithoutFilter = async (name, atribute) => {
	try {
		const querySnapshot = await getDocs(
			query(reviwsCollectionRef, where(name, '==', atribute))
		);
		return querySnapshot;
	} catch (error) {
		console.error('Ошибка при удалении отзывов:', error);
	}
};

export const deleteReviewsByAtribute = async (name, atribute) => {
	try {
		const querySnapshot = await getReviewsByAtributeWithoutFilter(
			name,
			atribute
		);
		const batch = writeBatch(db); // создание батча для группового удаления

		querySnapshot.forEach(doc => {
			batch.delete(doc.ref); // добавление каждого документа в батч на удаление
		});

		await batch.commit(); // выполнение батча
	} catch (error) {
		console.error('Ошибка при удалении отзывов:', error);
	}
};

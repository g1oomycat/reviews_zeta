import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
	writeBatch,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { getReviewsByAtributeWithoutFilter } from './Reviws';
import { getUserFromAtributeWithoutFilter } from './Users';

const placeCollectionRef = collection(db, 'place');

//Запрос на изъятия всех мест
export const getPlaceList = async () => {
	try {
		const dataPlace = await getDocs(
			query(placeCollectionRef, orderBy('date', 'desc'))
		);
		const filteredDataPlace = dataPlace.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));
		return filteredDataPlace;
	} catch (error) {
		console.error(error);
	}
};

//Запрос на изъятия конкретного места по id

export const getPlace = async id => {
	try {
		const placeDocSnapshot = await getDoc(doc(placeCollectionRef, id));

		if (placeDocSnapshot.exists()) {
			return placeDocSnapshot.data();
		} else {
			throw new Error('Место с указанным ID не найден');
		}
	} catch (error) {
		console.error(error);
	}
};

//Запрос на изъятия конкретное место
export const getCorrectPlace = async (atribute, target) => {
	try {
		const correctPlace = await getDocs(
			query(placeCollectionRef, where(atribute, '==', target))
		);
		const filteredDataCorrectPlace = correctPlace.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));
		return filteredDataCorrectPlace;
	} catch (error) {
		console.error(error);
	}
};

//Добавление нового места
export const AddPlace = async dataPlace => {
	try {
		await addDoc(placeCollectionRef, dataPlace);
	} catch (error) {
		console.error(error);
	}
};
//Запрос на удаление 1 места
export const DelPlace = async id => {
	try {
		await deleteDoc(doc(db, 'place', id));
	} catch (error) {
		console.error(error);
	}
};
//Запрос на удаление 1 места и всех остальных данных связанные с этим местом
export const DelPlaceWithOtherData = async place => {
	const batch = writeBatch(db);
	try {
		// Удаляем отзывы, связанные с этим местом
		const reviewsSnapshot = await getReviewsByAtributeWithoutFilter(
			'place',
			place.name
		);
		reviewsSnapshot.forEach(reviewDoc => {
			batch.delete(reviewDoc.ref);
		});
		// Удаляем пользователей, связанных с этим местом
		const usersSnapshot = await getUserFromAtributeWithoutFilter(
			'place',
			place.name
		);
		const avatarDeletePromises = [];

		usersSnapshot.forEach(userDoc => {
			const userData = userDoc.data();

			// Удаляем аватарку пользователя из хранилища
			if (userData.foto) {
				const avatarRef = ref(storage, userData.foto);
				avatarDeletePromises.push(deleteObject(avatarRef));
			}

			batch.delete(userDoc.ref);
		});
		// Выполняем удаление документов из базы данных
		await batch.commit();

		// Выполняем удаление аватарок из хранилища
		await Promise.all(avatarDeletePromises);

		// Удаляем место
		await DelPlace(place.id);

		console.log(
			'Place, related reviews, users and their avatars deleted successfully'
		);
	} catch (error) {
		console.error(error);
	}
};

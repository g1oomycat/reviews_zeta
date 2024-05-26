import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import FormForPlaces from '../../../components/adminPanel/forms/formForPlaces/FormForPlaces';
import TableForPlaces from '../../../components/adminPanel/tables/TableForPlaces';
import Title from '../../../components/adminPanel/title/Title';

const Places = observer(() => {
	const { placeList } = useContext(Context);
	const [listPlaces, setListPlaces] = useState([]);

	useEffect(() => {
		setListPlaces(placeList.placesData);
	}, [placeList.placesData]);
	return (
		<>
			<Title text={'Добавить магазин'} />
			<FormForPlaces />
			<TableForPlaces dataList={listPlaces} />
		</>
	);
});

export default Places;

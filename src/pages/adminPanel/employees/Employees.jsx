import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { getUserFromAtribute, getUsersList } from '../../../api/Users';
import TableForEmployees from '../../../components/adminPanel/tables/TableForEmployees';
import Title from '../../../components/adminPanel/title/Title';

const Employees = observer(() => {
	const [listUsers, setListUsers] = useState([]);
	const { directorData, placeList } = useContext(Context);

	const request = async () => {
		let response;
		if (directorData.director.role === 'admin') {
			response = await getUsersList();
		} else {
			response = await getUserFromAtribute(
				'place',
				directorData.director.place
			);
		}

		setListUsers(response);
	};
	useEffect(() => {
		if (Object.keys(directorData.director).length) {
			request();
		}
	}, [directorData.director]);
	return (
		<>
			<Title text={'Сотрудники'} />
			<TableForEmployees dataList={listUsers} request={request} />
		</>
	);
});

export default Employees;

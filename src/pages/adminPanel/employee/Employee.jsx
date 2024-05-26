import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviwsByAtribute } from '../../../api/Reviws';
import { getUser } from '../../../api/Users';
import InfoEmployee from '../../../components/adminPanel/employee/infoEmployee/InfoEmployee';
import TableForEmployee from '../../../components/adminPanel/tables/TableForEmployee';
import Title from '../../../components/adminPanel/title/Title';
import classes from './employee.module.scss';

const Employee = () => {
	const { id } = useParams();
	const [employeeData, setEmployeeData] = useState({});
	const [listReviews, setListReviews] = useState([]);

	const fetchEmployeeAndReviews = async () => {
		try {
			const [user, review] = await Promise.all([
				getUser(id),
				getReviwsByAtribute('user_ID', id),
			]);

			setEmployeeData(user);
			setListReviews(review);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchEmployeeAndReviews();
	}, []);
	return (
		<>
			<Title text={`${employeeData.speciality} ${employeeData.firstName}`} />
			<div className={classes.wrapper}>
				<InfoEmployee employee={employeeData} />
				<div>
					<TableForEmployee
						dataList={listReviews}
						fetchEmployeeAndReviews={fetchEmployeeAndReviews}
					/>
				</div>
			</div>
		</>
	);
};

export default Employee;

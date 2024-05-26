import React, { useContext, useState } from 'react';
import { MdOutlineMessage } from 'react-icons/md';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../..';
import { GradeList } from '../../../../anyList/gradeList';
import { handleDownloadQR, handleOpenQR } from '../../../../api/GenerateQR';
import { DelUser } from '../../../../api/Users';
import FormFromUser from '../../forms/formFromEmployee/FormFromUser';
import classes from './infoEmployee.module.scss';

const InfoEmployee = ({ employee }) => {
	const [isChangeData, setIsChangeData] = useState(false);
	return (
		<div className={classes.wrapper}>
			{isChangeData ? (
				<FormFromUser />
			) : (
				<div className={classes.body}>
					<ButtonDelete employee={employee} />
					<Avatar ava={employee.foto} />
					<RatingAndQuantityReview employee={employee} />
					<ActionQR employee={employee} />
					<InfoBlock employee={employee} />
					<ButtonChange setIsChangeData={setIsChangeData} />
				</div>
			)}
		</div>
	);
};

const ButtonDelete = ({ employee }) => {
	const { popupDel } = useContext(Context);
	const navigate = useNavigate();
	const handleDeleteEmployee = async () => {
		const handleDeleteClick = async () => {
			await DelUser(employee);
			navigate('/admin_panel/employees');
		};
		popupDel.setIsOpen(true);
		popupDel.setHandleDelete(handleDeleteClick);
		popupDel.setMessage('Удалить сотрудника?');
	};
	return (
		<div className={classes.delete}>
			<button className={'row-button'} onClick={handleDeleteEmployee}>
				Удалить <RiDeleteBin2Line />
			</button>
		</div>
	);
};

const Avatar = ({ ava }) => (
	<div className={classes.avatar}>
		<div className={classes.circle}>
			<img
				src={ava ? ava : process.env.PUBLIC_URL + 'images/NoFaceAva.jpg'}
				alt='ava'
			/>
		</div>
	</div>
);

const RatingAndQuantityReview = ({ employee }) => (
	<div className={classes.wrapper_block}>
		<ItemRatingAndQuantityReview
			title='Средняя оценка'
			num={employee.rating}
			icon={GradeList[Math.max(0, parseInt(employee?.rating) - 1)]}
		/>
		<ItemRatingAndQuantityReview
			title='Количество отзывов'
			num={employee.quantityReview}
			icon={<MdOutlineMessage />}
		/>
	</div>
);

const ItemRatingAndQuantityReview = ({ num, icon, title }) => (
	<div className={classes.item}>
		<div className={classes.text}>
			<span className={classes.title}>{title}</span>
			<span className={classes.num}>{num ? num : 'Нет отзывов'}</span>
		</div>
		<div className={classes.icon}>{icon}</div>
	</div>
);

const ActionQR = ({ employee }) => (
	<div className={classes.qr_block}>
		<button onClick={() => handleDownloadQR(employee)} className={'row-button'}>
			Cкачать QR
		</button>
		<button className={'row-button'} onClick={() => handleOpenQR(employee.id)}>
			Открыть QR
		</button>
	</div>
);
const InfoBlock = ({ employee }) => (
	<div className={classes.info_block}>
		<ItemInfo title={'Имя'} data={employee.firstName} />
		<ItemInfo title={'Фамилия'} data={employee.lastName} />
		<ItemInfo title={'Отчество'} data={employee.surName} />
		<ItemInfo title={'Телефон'} data={employee.telephone} />
		<ItemInfo title={'Должность'} data={employee.speciality} />
		<ItemInfo title={'Место'} data={employee.place} />
		<ItemInfo
			title={'Дата регистрации'}
			data={new Date(employee.date?.seconds * 1000).toLocaleDateString()}
		/>
	</div>
);
const ItemInfo = ({ title, data }) => (
	<div className={classes.info}>
		<span className={classes.title}>{title}</span>
		<span className={classes.data}>{data}</span>
	</div>
);

const ButtonChange = ({ setIsChangeData }) => (
	<button className='row-button' onClick={() => setIsChangeData(true)}>
		Изменить данные
	</button>
);
export default InfoEmployee;

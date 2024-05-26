import React, { useContext, useState } from 'react';
import { handleDownloadQR, handleOpenQR } from '../../../api/GenerateQR';
import CountTitle from '../countTitle/CountTitle';
import PageNavigationButtons from '../pageNavigationButtons/PageNavigationButtons';

import { Link } from 'react-router-dom';
import { Context } from '../../..';
import { DelUser } from '../../../api/Users';

const SIZE_PAGE = 30;

const TableForEmployees = ({ dataList, request }) => {
	const [indexPage, setIndexPage] = useState(1);
	return (
		<>
			<CountTitle len={dataList.length} name={'сотрудников'} />
			<div className='table_admin'>
				<div className='row header emploees'>
					<div className='cell'>ФИО сотрудника</div>
					<div className='cell'>Должность</div>
					<div className='cell'>Рейтинг</div>
					<div className='cell'>Отзывов</div>
					<div className='cell'>Магазин</div>
					<div className='cell'>QR-код</div>
					<div className='cell'>Действия</div>
				</div>
				{dataList
					.slice(SIZE_PAGE * (indexPage - 1), SIZE_PAGE * indexPage)
					.map((data, index) => (
						<RowTable data={data} key={index} request={request} />
					))}
			</div>
			{dataList.length > SIZE_PAGE && (
				<PageNavigationButtons
					dataList={dataList}
					indexPage={indexPage}
					setIndexPage={setIndexPage}
					sizeOnePage={SIZE_PAGE}
				/>
			)}
		</>
	);
};
const RowTable = ({ data, request }) => {
	const { popupDel } = useContext(Context);
	const handleDeleteEmployee = async () => {
		const handleDeleteClick = async () => {
			const res = await DelUser(data);
			request();
		};
		popupDel.setIsOpen(true);
		popupDel.setHandleDelete(handleDeleteClick);
		popupDel.setMessage('Удалить сотрудника?');
	};
	return (
		<div className='row emploees'>
			<div className='cell'>
				<Link className={'row-button'} to={`/admin_panel/employees/${data.id}`}>
					{data.lastName} {data.firstName}
				</Link>
			</div>
			<div className='cell'>{data.speciality}</div>
			<div className='cell'>{data.rating}</div>
			<div className='cell'>{data.quantityReview} </div>
			<div className='cell'>{data.place}</div>
			<div className='cell'>
				<button
					onClick={() => handleDownloadQR(data)}
					className={'row-button'}
					style={{ marginRight: '1rem' }}
				>
					Cкачать
				</button>
				<button className={'row-button'} onClick={() => handleOpenQR(data.id)}>
					Открыть
				</button>
			</div>
			<div className='cell'>
				<button className={'row-button'} onClick={handleDeleteEmployee}>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default TableForEmployees;

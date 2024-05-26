import React, { useContext, useState } from 'react';
import { Context } from '../../..';
import { DelPlaceWithOtherData, getPlaceList } from '../../../api/Place';
import CountTitle from '../countTitle/CountTitle';
import PageNavigationButtons from '../pageNavigationButtons/PageNavigationButtons';

const SIZE_PAGE = 30;

const TableForPlaces = ({ dataList }) => {
	const [indexPage, setIndexPage] = useState(1);
	return (
		<>
			<CountTitle len={dataList.length} name={'мест'} />
			<div className='table_admin'>
				<div className='row header places'>
					<div className='cell'>Место</div>
					<div className='cell'>Яндекс</div>
					<div className='cell'>twoGis</div>
					<div className='cell'>Google</div>
					<div className='cell'>Действия</div>
				</div>
				{dataList
					.slice(SIZE_PAGE * (indexPage - 1), SIZE_PAGE * indexPage)
					.map((data, index) => (
						<RowTable data={data} key={index} />
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
const RowTable = ({ data }) => {
	const { popupDel, placeList } = useContext(Context);
	const handleDeleteEmployee = async () => {
		const handleDeleteClick = async () => {
			await DelPlaceWithOtherData(data);
			const res = await getPlaceList();
			placeList.setPlacesData(res);
		};
		popupDel.setIsOpen(true);
		popupDel.setHandleDelete(handleDeleteClick);
		popupDel.setMessage(
			'Удалить магазин, сотрудников и отзывы этого магазина?'
		);
	};

	return (
		<div className='row places'>
			<div className='cell'>{data.name}</div>
			<div className='cell'>
				<a className={'link'} href={data.urlMap['google']}>
					Открыть карту
				</a>
			</div>
			<div className='cell'>
				<a className={'link'} href={data.urlMap['twoGis']}>
					Открыть карту
				</a>
			</div>
			<div className='cell'>
				<a className={'link'} href={data.urlMap['yandex']}>
					Открыть карту
				</a>
			</div>
			<div className='cell'>
				<button className={'row-button'} onClick={handleDeleteEmployee}>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default TableForPlaces;

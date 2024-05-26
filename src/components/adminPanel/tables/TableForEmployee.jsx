import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../..';
import { DelReviwsList } from '../../../api/Reviws';
import { setGradeAndReviewsUser } from '../../../api/Users';
import CountTitle from '../countTitle/CountTitle';
import PageNavigationButtons from '../pageNavigationButtons/PageNavigationButtons';

const SIZE_PAGE = 20;

const TableForEmployee = ({ dataList, fetchEmployeeAndReviews }) => {
	const [indexPage, setIndexPage] = useState(1);
	return (
		<>
			<CountTitle len={dataList.length} name={'сотрудников'} />
			<div className='table_admin'>
				<div className='row header emploee'>
					<div className='cell'>Имя клиента</div>
					<div className='cell'>Телефон</div>
					<div className='cell'>Отзыв</div>
					<div className='cell center'>Оценка </div>
					<div className='cell'>Дата</div>
					<div className='cell'>Действие</div>
				</div>
				{dataList
					.slice(SIZE_PAGE * (indexPage - 1), SIZE_PAGE * indexPage)
					.map((data, index) => (
						<RowTable
							data={data}
							key={index}
							fetchEmployeeAndReviews={fetchEmployeeAndReviews}
						/>
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
const RowTable = ({ data, fetchEmployeeAndReviews }) => {
	const { popupDel } = useContext(Context);
	const textRef = useRef(null);
	const [isTextTruncated, setTextTruncated] = useState(false);
	const [isTextExpanded, setTextExpanded] = useState(false);
	const date = new Date(data.date.seconds * 1000);

	const handleDeleteEmployee = async () => {
		const handleDeleteClick = async () => {
			await DelReviwsList(data.id);
			await setGradeAndReviewsUser(data.user_ID);
			await fetchEmployeeAndReviews();
		};
		popupDel.setIsOpen(true);
		popupDel.setHandleDelete(handleDeleteClick);
		popupDel.setMessage('Удалить отзыв?');
	};

	// Проверяем, обрезан ли текст после рендера компонента
	useEffect(() => {
		const textElement = textRef.current;
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				// Проверяем, обрезан ли текст в зависимости от текущей ширины элемента
				setTextTruncated(
					entry.target.scrollWidth > Math.round(entry.contentRect.width)
				);
			}
		});

		if (textElement) {
			resizeObserver.observe(textElement);
		}
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	return (
		<div className='row emploee'>
			<div className='cell'>{data.name}</div>
			<div className='cell'>{data.number}</div>
			<div className={`cell ${!isTextExpanded && 'disp-flex cut_text'}`}>
				<span ref={textRef}>{data.reviws}</span>
				{isTextTruncated && !isTextExpanded && (
					<button
						className='row-button'
						style={{ fontSize: '1.3rem', width: '100%' }}
						onClick={() => setTextExpanded(!isTextExpanded)}
					>
						Показать
					</button>
				)}
				{isTextExpanded && (
					<button
						className='row-button'
						style={{ fontSize: '1.3rem', width: '100%' }}
						onClick={() => setTextExpanded(!isTextExpanded)}
					>
						Скрыть
					</button>
				)}
			</div>
			<div className='cell center'>{data.grade}</div>

			<div className='cell'>
				{date.toLocaleDateString()} {date.toLocaleTimeString().slice(0, 5)}
			</div>
			<div className='cell'>
				<button className={'row-button'} onClick={handleDeleteEmployee}>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default TableForEmployee;

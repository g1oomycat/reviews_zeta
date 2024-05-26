import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CountTitle from '../countTitle/CountTitle';
import PageNavigationButtons from '../pageNavigationButtons/PageNavigationButtons';

const SIZE_PAGE = 15;

const TableForReviws = ({ dataList }) => {
	const [indexPage, setIndexPage] = useState(1);

	return (
		<>
			<CountTitle len={dataList.length} name={'отзывов'} />
			<div className='table_admin'>
				<div className='row header reviws'>
					<div className='cell'>Имя клиента</div>
					<div className='cell'>Телефон</div>
					<div className='cell'>Отзыв</div>
					<div className='cell center'>Оценка </div>
					<div className='cell'>Магазин </div>
					<div className='cell'>Сотрудник</div>
					<div className='cell'>Дата</div>
				</div>
				{dataList
					.slice(SIZE_PAGE * (indexPage - 1), SIZE_PAGE * indexPage)
					.map((review, index) => (
						<RowTable review={review} key={index} />
					))}
			</div>
			{dataList.length > SIZE_PAGE && (
				<PageNavigationButtons
					dataListLen={dataList.length}
					indexPage={indexPage}
					setIndexPage={setIndexPage}
					sizeOnePage={SIZE_PAGE}
				/>
			)}
		</>
	);
};
const RowTable = ({ review }) => {
	const textRef = useRef(null);
	const [isTextTruncated, setTextTruncated] = useState(false);
	const [isTextExpanded, setTextExpanded] = useState(false);
	const date = new Date(review.date.seconds * 1000);

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

		// Очистка при размонтировании компонента
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<div className='row reviws'>
			<div className='cell'>{review.name}</div>
			<div className='cell'>{review.number}</div>
			<div className={`cell ${!isTextExpanded && 'disp-flex cut_text'}`}>
				<span ref={textRef}>{review.reviws}</span>
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
			<div className='cell center'>{review.grade}</div>
			<div className='cell'>{review.place}</div>
			<div className='cell'>
				<Link
					className='row-button'
					to={`/admin_panel/employees/${review.user_ID}`}
				>
					{review.user_Fio}
				</Link>
			</div>
			<div className='cell'>
				{date.toLocaleDateString()} {date.toLocaleTimeString().slice(0, 5)}
			</div>
		</div>
	);
};
export default TableForReviws;

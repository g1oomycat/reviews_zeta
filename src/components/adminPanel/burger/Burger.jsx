import { observer } from 'mobx-react-lite';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { BiBarChartAlt } from 'react-icons/bi';
import { GoPerson, GoPersonAdd } from 'react-icons/go';
import { IoMdAddCircleOutline } from 'react-icons/io';
import {
	MdOutlineAddLocationAlt,
	MdOutlineKeyboardArrowDown,
	MdOutlineMessage,
} from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../..';
import classes from './burger.module.scss';

const listItem = [
	{
		link: '/admin_panel/analytics',
		icon: <BiBarChartAlt />,
		name: 'Аналитика',
		admin: false,
	},
	{
		icon: <IoMdAddCircleOutline />,
		name: 'Добавить',

		subList: [
			{
				link: '/admin_panel/add-employee',
				icon: <GoPersonAdd />,
				name: 'Сотрудника',
				admin: false,
			},
			{
				link: '/admin_panel/places',
				icon: <MdOutlineAddLocationAlt />,
				name: 'Магазин',
				admin: true,
			},
		],
	},
	{
		link: '/admin_panel/reviws',
		icon: <MdOutlineMessage />,
		name: 'Отзывы',
		admin: false,
	},
	{
		link: '/admin_panel/employees',
		icon: <GoPerson />,
		name: 'Сотрудники',
		admin: false,
	},
];
const Burger = observer(() => {
	const location = useLocation();
	const { directorData } = useContext(Context);
	return (
		<div className={classes.burger}>
			<div className={classes.logo}>
				<Link to={'/admin_panel/analytics'}>ZETA</Link>
			</div>
			<div className={classes.conteiner}>
				{listItem.map((item, index) =>
					item.link ? (
						<ItemList
							item={item}
							location={location.pathname}
							role={directorData.director.role}
							key={index}
						/>
					) : (
						<SubItemList
							item={item}
							location={location.pathname}
							role={directorData.director.role}
							key={index}
						/>
					)
				)}
			</div>
		</div>
	);
});

const ItemList = ({ item, location, role }) => (
	<>
		{(item.admin ? role === 'admin' : true) && (
			<Link
				to={item.link}
				className={`${classes.item} ${
					location === item.link ? classes.active_link : ''
				}`}
			>
				<span className={classes.title_item}>
					{item.icon}
					<p>{item.name}</p>
				</span>
			</Link>
		)}
	</>
);
const SubItemList = ({ item, location, role }) => {
	const [active, setActive] = useState(
		!!item.subList.filter(el => el.link === location).length
	);
	const contentRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(0);
	useLayoutEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current.scrollHeight);
		}
	}, [active]);

	return (
		<>
			<button
				className={`${classes.item} ${active ? classes.active : ''}`}
				onClick={() => setActive(!active)}
			>
				<span className={classes.title_item}>
					{item.icon}
					<p>{item.name}</p>
				</span>
				<span
					className={classes.arrow}
					style={{ transform: active ? 'rotate(180deg)' : 'rotate(0deg)' }}
				>
					<MdOutlineKeyboardArrowDown />
				</span>
			</button>
			<div
				ref={contentRef}
				className={classes.wrapper_sublist}
				style={{ maxHeight: active ? contentHeight + 'px' : 0 }}
			>
				{item.subList.map((item, index) => (
					<ItemList item={item} key={index} location={location} role={role} />
				))}
			</div>
		</>
	);
};
export default Burger;

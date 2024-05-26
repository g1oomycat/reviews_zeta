import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../..';
import PopupDel from '../adminPanel/PopupDel/PopupDel';
import Burger from '../adminPanel/burger/Burger';
import Header from '../adminPanel/header/Header';
import ModalWindow from '../adminPanel/modalWindow/ModalWindow';

const Protected = observer(() => {
	const { directorData } = useContext(Context);

	if (!directorData.isAuthReady) {
		return <div>Loading...</div>;
	}
	return directorData.isAuthenticated ? (
		<>
			<Header />
			<Burger />
			<ModalWindow />
			<PopupDel />
			<div className='conteiner-admin'>
				<div className='body-admin'>
					<Outlet />
				</div>
			</div>
		</>
	) : (
		<Navigate to={'/sign_in'} />
	);
});

export default Protected;

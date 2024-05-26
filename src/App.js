import { onAuthStateChanged } from 'firebase/auth';
import { AnimatePresence } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import 'react-image-crop/src/ReactCrop.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Context } from '.';
import { getDirectorFromAtribute } from './api/Directors';
import { getCorrectPlace, getPlaceList } from './api/Place';
import Protected from './components/protected/Protected';
import { auth } from './config/firebase';
import AddEmployee from './pages/adminPanel/addEmployee/AddEmployee';
import Analytics from './pages/adminPanel/analytics/Analytics';
import Employee from './pages/adminPanel/employee/Employee';
import Employees from './pages/adminPanel/employees/Employees';
import Places from './pages/adminPanel/places/Places';
import Reviws from './pages/adminPanel/reviws/Reviws';
import Authorization from './pages/authorization/Authorization';
import Error from './pages/error/Error';
import Gratitude from './pages/gratitude/Gratitude';
import Main from './pages/main/Main';
import Worker from './pages/worker/Worker';
import './styles/main.scss';

function App() {
	const location = useLocation();
	const { directorData, placeList } = useContext(Context);

	const getDirector = async id => {
		const res = await getDirectorFromAtribute('directorId', id);
		const user = res[0];
		directorData.setDirector(user);

		let placesList;
		if (user.role === 'admin') {
			placesList = await getPlaceList();
		} else {
			placesList = await getCorrectPlace('name', user.place);
		}
		placeList.setPlacesData(placesList);
	};

	useEffect(() => {
		if (
			location.pathname.startsWith('/admin_panel') ||
			location.pathname.startsWith('/sign_in')
		) {
			document.documentElement.style.setProperty('--body-color', 'black');
		}
	}, [location]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				directorData.setIsAuthenticated(true);
				directorData.setIsAuthReady(true);
				getDirector(user.uid);
			} else {
				directorData.setIsAuthenticated(false);
				directorData.setIsAuthReady(true);
			}
		});
		return () => {
			unsubscribe();
			directorData.setIsAuthReady(false);
		};
	}, []);

	return (
		<main className='main'>
			<AnimatePresence mode='wait'>
				<Routes location={location} key={location.pathname}>
					<Route index element={<Main />} />
					<Route path='/reviw' element={<Error />} />
					<Route path='/reviw/:id' element={<Worker />} />
					<Route
						path='/reviw/gratitude/:grade/:place'
						element={<Gratitude />}
					/>
					{!directorData.isAuthenticated && (
						<Route path='/sign_in' element={<Authorization />} />
					)}
					<Route path='/admin_panel' element={<Protected />}>
						<Route path='analytics' element={<Analytics />} />
						<Route path='reviws' element={<Reviws />} />
						<Route path='add-employee' element={<AddEmployee />} />
						<Route path='employees' element={<Employees />} />
						<Route path='employees/:id' element={<Employee />} />
						{directorData.director.role === 'admin' && (
							<Route path='places' element={<Places />} />
						)}
					</Route>
					<Route path='*' element={<Error />} />
				</Routes>
			</AnimatePresence>
		</main>
	);
}

export default App;

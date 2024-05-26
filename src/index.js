import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Director from './store/Director';
import PlaceList from './store/PlaceList';
import PopupCrop from './store/PopupCrop';
import PopupDel from './store/PopupDel';
import './styles/main.scss';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Context.Provider
		value={{
			directorData: new Director(),
			statePopup: new PopupCrop(),
			placeList: new PlaceList(),
			popupDel: new PopupDel(),
		}}
	>
		<Router>
			<Routes>
				<Route path='/*' element={<App />} />
			</Routes>
		</Router>
	</Context.Provider>
);

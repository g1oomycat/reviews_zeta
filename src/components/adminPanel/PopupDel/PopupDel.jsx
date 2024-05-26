import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useEffect } from 'react';
import { Context } from '../../..';
import { popupBlockAnimation } from '../../../animationsFramerMotion/Popup';
import classes from './popupDel.module.scss';

const PopupDel = observer(() => {
	const { popupDel } = useContext(Context);

	const closeModalWindow = useCallback(() => {
		popupDel.setHandleDelete(null);
		popupDel.setIsOpen(false);
		popupDel.setMessage('');
	}, [popupDel]);

	async function handleClickDeleteData() {
		await popupDel.handleDelete();
		closeModalWindow();
	}
	// обработчик события закрытия на кнопку esc
	useEffect(() => {
		const handleKeyDown = event => {
			if (event.keyCode === 27) {
				console.log('12');
				closeModalWindow();
			}
		};
		if (popupDel.isOpen) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleKeyDown);
		} else {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'auto';
		};
	}, [popupDel.isOpen]);

	const handleOverlayClick = event => {
		if (event.target === event.currentTarget) {
			closeModalWindow();
		}
	};

	return (
		<AnimatePresence>
			{popupDel.isOpen && (
				<div className='popup_wrapper' onClick={handleOverlayClick}>
					<motion.div
						className={classes.body}
						variants={popupBlockAnimation}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<div className={classes.header}>{popupDel.message}</div>
						<div className={classes.flex_button}>
							<button onClick={closeModalWindow}>Отмена</button>
							<button onClick={handleClickDeleteData}>Удалить</button>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
});

export default PopupDel;

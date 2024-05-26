import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { GrClose } from 'react-icons/gr';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Context } from '../../..';
import { popupBlockAnimation } from '../../../animationsFramerMotion/Popup';
import {
	ASPECT_RATIO,
	MIN_DIMENSION,
	//   setCanvasPreview,
	//   resizeAndCompressImage,
	processAndSetImage,
} from '../../../functions/allForCropImg';
import classes from './modalWindow.module.scss';

const ModalWindow = observer(() => {
	const { statePopup } = useContext(Context);
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [crop, setCrop] = useState();

	const closeModalWindow = () => {
		statePopup.setSrcImg('');
		statePopup.setIsOpen(false);
	};
	//отслеживание кнопи ескейп для закрытия
	useEffect(() => {
		const handleKeyDown = event => {
			if (event.keyCode === 27) {
				closeModalWindow();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const onImageLoad = e => {
		const { width, height } = e.currentTarget;
		const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

		const crop = makeAspectCrop(
			{
				unit: '%',
				width: cropWidthInPercent,
			},
			ASPECT_RATIO,
			width,
			height
		);
		const centeredCrop = centerCrop(crop, width, height);
		setCrop(centeredCrop);
	};

	const handleCropComplete = () => {
		// setCanvasPreview(
		//   imgRef.current,
		//   previewCanvasRef.current,
		//   convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
		// );
		// const compressedDataURL = resizeAndCompressImage(previewCanvasRef.current);
		const compressedDataURL = processAndSetImage(
			imgRef,
			previewCanvasRef,
			crop,
			1 // Качество JPEG
		);
		statePopup.setSrcAvatar(compressedDataURL);
		statePopup.setIsOpen(false);
	};

	return (
		<AnimatePresence mode='wait'>
			{statePopup.isOpen && (
				<div className='popup_wrapper'>
					<motion.div
						className={classes.body}
						variants={popupBlockAnimation}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<div className={classes.header}>
							<button
								className={classes.botton_exit}
								onClick={closeModalWindow}
							>
								<GrClose />
							</button>
							<span>Изображение можно перемещать</span>
						</div>
						<div className={classes.crop}>
							<ReactCrop
								crop={crop}
								onChange={percentCrop => setCrop(percentCrop)}
								circularCrop
								keepSelection
								aspect={ASPECT_RATIO}
								minWidth={MIN_DIMENSION}
							>
								<img
									ref={imgRef}
									src={statePopup.srcImg}
									alt='Upload'
									style={{ width: '100%' }}
									onLoad={onImageLoad}
								/>
							</ReactCrop>
						</div>
						<div className={classes.footer}>
							<button
								className={classes.accept}
								// onClick={() => {
								//   setCanvasPreview(
								//     imgRef.current, // HTMLImageElement
								//     previewCanvasRef.current, // HTMLCanvasElement
								//     convertToPixelCrop(
								//       crop,
								//       imgRef.current.width,
								//       imgRef.current.height
								//     )
								//   );
								//   const dataUrl = previewCanvasRef.current.toDataURL();
								//   setSrcAvatar(dataUrl);

								//   setIsOpen(false);
								// }}
								onClick={handleCropComplete}
							>
								<FaCheck />
							</button>
						</div>
						{crop && (
							<canvas
								ref={previewCanvasRef}
								className='mt-4'
								style={{
									display: 'none',
									border: '1px solid black',
									objectFit: 'contain',
									width: 100,
									height: 100,
								}}
							/>
						)}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
});

export default ModalWindow;

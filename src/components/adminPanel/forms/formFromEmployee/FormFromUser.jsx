import { Button, ThemeProvider } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Context } from '../../../..';
import { AddAvatar } from '../../../../api/Storage';
import { AddUser } from '../../../../api/Users';
import { TextFieldAndButton } from '../../../../customMUI/styles';
import {
	nameValidation,
	requiredValidation,
	surNameValidation,
	telephoneMask,
	telephoneValidation,
} from '../../../../validation/validation';
import {
	InpSelect,
	InpTextField,
	InpTextFieldWithMask,
} from '../../../inputsForForm/Components';
import CropImage from '../../cropImage/CropImage';
import classes from './formFromEmployee.module.scss';

const specialityList = [
	'Кассир',
	'Менеджер',
	'СВК',
	'Бухгалтер',
	'Старший кассир',
	'Старший менеджер',
];

const FormFromUser = observer(() => {
	const { statePopup, placeList } = useContext(Context);
	const [isSend, setIsSend] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		mode: 'onChange',
	});

	const onSubmit = async data => {
		setIsSend(true);

		let urlFoto;
		if (
			statePopup.srcAvatar !==
			process.env.PUBLIC_URL + 'images/NoFaceAva.jpg'
		) {
			const base64String = statePopup.srcAvatar.split(',')[1];
			const bytes = window.atob(base64String);
			const byteNumbers = new Array(bytes.length);
			for (let i = 0; i < bytes.length; i++) {
				byteNumbers[i] = bytes.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);

			urlFoto = await AddAvatar(
				byteArray,
				data.lastName + '_' + data.firstName
			);
		} else {
			urlFoto = null;
		}

		const user = {
			firstName: data.firstName,
			lastName: data.lastName,
			surName: data.surName || 'не указан',
			telephone: data.telephone || 'не указан',
			speciality: data.speciality,
			place: data.place,
			date: Timestamp.now(),
			quantityReview: 0,
			rating: 0,
			foto: urlFoto,
		};
		await AddUser(user);

		statePopup.setSrcAvatar(process.env.PUBLIC_URL + 'images/NoFaceAva.jpg');
		statePopup.setSrcImg('');
		reset();
		setIsSend(false);
	};
	return (
		<div className={classes.user_wrapper}>
			<div className={classes.title}>Добавить сотрудника</div>
			<CropImage />
			<ThemeProvider theme={TextFieldAndButton}>
				<form
					action=''
					onSubmit={handleSubmit(onSubmit)}
					className={classes.form_employee}
				>
					<div className={classes.wrapper_input}>
						<InpTextField
							name={'firstName'}
							label={'Имя*'}
							variant={'standard'}
							validation={nameValidation}
							control={control}
						/>
						<InpTextField
							name={'lastName'}
							label={'Фамилия*'}
							variant={'standard'}
							validation={nameValidation}
							control={control}
						/>
						<InpTextField
							name={'surName'}
							label={'Отчество'}
							variant={'standard'}
							validation={surNameValidation}
							control={control}
						/>
						<InpTextFieldWithMask
							name={'telephone'}
							label={'Телефон'}
							variant={'standard'}
							validation={telephoneValidation}
							control={control}
							mask={telephoneMask}
						/>
						<InpSelect
							name={'speciality'}
							label={'Должность*'}
							variant={'standard'}
							validation={requiredValidation}
							control={control}
							list={specialityList}
						/>
						<InpSelect
							name={'place'}
							label={'Место*'}
							variant={'standard'}
							validation={requiredValidation}
							control={control}
							list={placeList.placesData}
							valueKey={'name'}
							labelKey={'name'}
						/>
					</div>
					<Button
						variant='outlined'
						type='submit'
						fullWidth
						size='large'
						disabled={isSend}
						className={classes.form_button}
					>
						Добавить нового сотрудника
					</Button>
				</form>
			</ThemeProvider>
		</div>
	);
});

export default FormFromUser;

import { Button, ThemeProvider } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Context } from '../../../..';
import { AddPlace, getPlaceList } from '../../../../api/Place';
import { TextFieldAndButton } from '../../../../customMUI/styles';
import {
	adresValidation,
	requiredValidation,
} from '../../../../validation/validation';
import { InpTextField } from '../../../inputsForForm/Components';
import classes from './formForPlaces.module.scss';

const FormForPlaces = () => {
	const { placeList } = useContext(Context);
	const [isSend, setIsSend] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		mode: 'onChange',
	});

	const onSubmit = async data => {
		setIsSend(true);
		const dataPlace = {
			name: data.name,
			urlMap: { twoGis: data.twoGis, google: data.google, yandex: data.yandex },
			date: Timestamp.now(),
		};
		await AddPlace(dataPlace);
		const res = await getPlaceList();
		placeList.setPlacesData(res);
		reset();
		setIsSend(false);
	};
	return (
		<ThemeProvider theme={TextFieldAndButton}>
			<form
				action=''
				onSubmit={handleSubmit(onSubmit)}
				className={classes.form_place}
			>
				<div className={classes.title_add}>Добавить новый магазин</div>
				<div className={classes.wrapper_input}>
					<InpTextField
						name='name'
						label='Название магазина*'
						validation={adresValidation}
						variant='outlined'
						control={control}
					/>
					<InpTextField
						name='twoGis'
						label='Ссылка на 2gis*'
						validation={requiredValidation}
						variant='outlined'
						control={control}
					/>
					<InpTextField
						name='google'
						label='Ссылка на Google*'
						validation={requiredValidation}
						variant='outlined'
						control={control}
					/>
					<InpTextField
						name='yandex'
						label='Ссылка на Yandex*'
						validation={requiredValidation}
						variant='outlined'
						control={control}
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
					Добавить новый магазин
				</Button>
			</form>
		</ThemeProvider>
	);
};

export default FormForPlaces;

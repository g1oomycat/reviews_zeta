const REQUIRED_TEXT = 'Поле не заполнено';

export const telephoneMask = [
	'+',
	'7',
	' ',
	'(',
	/\d/,
	/\d/,
	/\d/,
	')',
	' ',
	/\d/,
	/\d/,
	/\d/,
	'-',
	/\d/,
	/\d/,
	'-',
	/\d/,
	/\d/,
];

export const requiredValidation = {
	required: REQUIRED_TEXT,
};

export const nameValidation = {
	required: REQUIRED_TEXT,
	validate: value => {
		if (!/^[А-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІіЁё\-]+$/i.test(value)) {
			return 'Только кириллица и тире';
		}
		return true;
	},
};
export const surNameValidation = {
	validate: value => {
		if (!/^[А-Яа-яҢңҒғӨөҮүІіЁёҰұ\-]+$/i.test(value) && value !== '') {
			return 'Только кириллица и тире';
		}
		return true;
	},
};

export const numberValidation = {
	required: REQUIRED_TEXT,
	validate: value => {
		if (!/^[0-9]+$/i.test(value)) {
			return 'Только цифры';
		}
		return true;
	},
};
export const telephoneValidation = {
	validate: value => {
		if (
			value.replace(/\D/g, '').length > 1 &&
			value.replace(/\D/g, '').length < 11
		) {
			return 'Обязательно 11 цифр';
		}
		return true;
	},
};

export const adresValidation = {
	required: REQUIRED_TEXT,
	validate: value => {
		if (!/^[А-Яа-яё0-9., ]*$/i.test(value)) {
			return 'Только кириллица, цифры, точка, запятая';
		}
		return true;
	},
};
export const emailValidation = {
	required: REQUIRED_TEXT,
	validate: value => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailRegex.test(value)) {
			return 'Некорректный Email';
		}
		return true;
	},
};
export const passwordlValidation = {
	required: REQUIRED_TEXT,

	validate: value => {
		const passwordRegex =
			/^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ0-9!@#$%^&*()_+{}:;<>,.?~/\-=[\]\\]{8,40}$/;
		if (!passwordRegex.test(value)) {
			return 'Обязательно: минимум 8 символов, одна заглавная и строчная буква, одна цифра';
		}
		return true;
	},
};

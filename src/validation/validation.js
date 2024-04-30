const REQUIRED_TEXT = "Поле не заполнено";

export const requiredValidation = {
  required: REQUIRED_TEXT,
};

export const nameValidation = {
  required: REQUIRED_TEXT,
  validate: (value) => {
    if (!/^[А-Яа-яё]+$/i.test(value)) {
      return "Только кириллица";
    }
    return true;
  },
};
export const discriptionVacansiesValidation = {
  required: REQUIRED_TEXT,
  validate: (value) => {
    if (!/^[^\n\r]*$/.test(value)) {
      return "Перенос строк запрещен";
    }
    if (value.length > 450) {
      return "Максимум 280символов";
    }
    return true;
  },
};
export const numberValidation = {
  required: REQUIRED_TEXT,
  validate: (value) => {
    if (!/^[0-9]+$/i.test(value)) {
      return "Только цифры";
    }
    return true;
  },
};
export const adresValidation = {
  required: REQUIRED_TEXT,
  validate: (value) => {
    if (!/^[А-Яа-яё0-9, ]*$/i.test(value)) {
      return "Только кириллица";
    }
    return true;
  },
};
export const emailValidation = {
  required: REQUIRED_TEXT,
  validate: (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      return "Некорректный Email";
    }
    return true;
  },
};
export const passwordlValidation = {
  required: REQUIRED_TEXT,

  validate: (value) => {
    const passwordRegex =
      /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ0-9!@#$%^&*()_+{}:;<>,.?~/\-=[\]\\]{8,40}$/;
    if (!passwordRegex.test(value)) {
      return "Некорректный пароль";
    }
    return true;
  },
};

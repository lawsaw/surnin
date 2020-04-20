export const RECAPTCHA_SECRET = '6LdtpdoUAAAAAHNciM2gB3BCc_Sqe1NAkZwLWmz9';
export const RECAPTCHA_PUBLIC = '6LdtpdoUAAAAAD515W6JHoX6ks1GsBJaRt_PxoA1';

export const ENV = process.env.NODE_ENV === 'development' ? {
    MODE: 'development',
    API_PREFIX: '/proxy',
} : {
    MODE: 'production',
    API_PREFIX: '',
};

export const VALID_GET_PARAMS = [
    'page',
    'category',
];

export const VALIDATION_MESSAGE = {
    //TODO:
    username: "Use latin words, '.' and '_' symbols",
    plain: "Use latin words, numbers, '()', '[]', '_', ',', '.' and space symbols",

    not_empty: "Это поле нужно заполнить",
    email: "Разрешается только валидный E-mail",
    recaptcha_empty: "Подтвердите, что вы не робот",
    recaptcha_repeat: "Подтвердите, пожалуйста, еще раз",
};

export const FORM_VALIDATION_MAP = {
    invalid_email_format: VALIDATION_MESSAGE.email,
    invalid_empty: VALIDATION_MESSAGE.not_empty,
    invalid_recaptcha_empty: VALIDATION_MESSAGE.recaptcha_empty,
    invalid_recaptcha_repeat: VALIDATION_MESSAGE.recaptcha_repeat,
};
import * as yup from 'yup';

export const ProfileFormSchema = yup.object({
	name: yup.string().required('Имя не может быть пустым'),
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Email не может быть пустым'),
	avatarPath: yup.string().required('Ссылка на аватар не может быть пустой'),
	about: yup.string().required('Введите описание пользователя'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(24, 'Пароль должен содержать максимум 24 символа')
		.required('Пароль не может быть пустым'),
});

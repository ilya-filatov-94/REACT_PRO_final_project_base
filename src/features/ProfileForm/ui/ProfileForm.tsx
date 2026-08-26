import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { useUpdateUserMutation, userActions } from 'entities/user';
import { getMessageFromError } from 'shared/utils';
import { ProfileFormSchema } from '../model/validator';
import { getDefaultValues } from '../model/utils';
import s from './ProfileForm.module.css';

type ProfileFormProps = {
	user: User | undefined;
};

export const ProfileForm = ({ user }: ProfileFormProps) => {
	const dispatch = useDispatch();
	const [updateProfileRequestFn, { isLoading }] = useUpdateUserMutation();
	const defaultValuesUser = useMemo(() => {
		return getDefaultValues(user);
	}, [user]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitted },
	} = useForm<ProfileFormValues>({
		defaultValues: defaultValuesUser,
		resolver: yupResolver(ProfileFormSchema),
		mode: 'onTouched',
	});

	const submitHandler: SubmitHandler<ProfileFormValues> = async (values) => {
		try {
			const response = await updateProfileRequestFn(values).unwrap();

			dispatch(userActions.setUser(response));

			toast.success('Данны пользователя обновлены!');
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Неизвестная ошибка при изменении данных пользователя'
				)
			);
		}
	};

	return (
		<>
			<h1 className={s['form__title']}>Мои данные</h1>
			<form className={s['form']} onSubmit={handleSubmit(submitHandler)}>
				<div className={s['form__row']}>
					<Input
						id='name'
						label='Имя пользователя'
						className={s.input}
						type='text'
						placeholder='Введите ваше имя'
						errorMessage={errors.name?.message}
						{...register('name')}
					/>
					<Input
						id='about'
						label='Описание профессии'
						className={s.input}
						type='text'
						placeholder='Введите Вашу профессию'
						errorMessage={errors.about?.message}
						{...register('about')}
					/>
				</div>
				<div className={s['form__row']}>
					<Input
						id='avatarPath'
						label='Ссылка на аватар'
						className={s.input}
						type='url'
						placeholder='Введите ссылку на аватарку'
						errorMessage={errors.avatarPath?.message}
						{...register('avatarPath')}
					/>
					<Input
						id='email'
						label='Ваш email'
						className={s.input}
						type='text'
						placeholder='Введите Ваш emal'
						errorMessage={errors.email?.message}
						{...register('email')}
					/>
				</div>
				<h2 className={s['form__title']}>Изменить пароль</h2>
				<div className={classNames(s['form__row'], s['form__row_min'])}>
					<Input
						id='password'
						label='Ваш новый пароль'
						className={s.input}
						type='password'
						placeholder='Введите новый пароль'
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
				</div>
				<Button
					type='submit'
					variant='secondary'
					maxContent
					disabled={isLoading || (!isValid && isSubmitted)}>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
				</Button>
			</form>
		</>
	);
};

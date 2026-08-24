import { Alert, CircularProgress } from '@mui/material';
import { useGetUserQuery } from '../../../entities/user';
import { ProfileForm } from '../../../features/ProfileForm';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { Button } from '../../../shared/ui/Button';
import { getMessageFromError } from '../../../shared/utils';

export const ProfilePage = () => {
	const {
		data: userData,
		isLoading,
		isError,
		error,
		refetch,
	} = useGetUserQuery();

	if (isLoading) {
		return <CircularProgress />;
	}

	if (isError) {
		return (
			<Alert
				severity='error'
				action={<Button onClick={refetch}>Обновить форму</Button>}>
				{getMessageFromError(error, 'Не удалось загрузить данные пользователя')}
			</Alert>
		);
	}

	if (!userData) {
		return <div>Данные пользователя отсутствуют</div>;
	}

	return (
		<>
			<ButtonBack />
			<ProfileForm user={userData} />
		</>
	);
};

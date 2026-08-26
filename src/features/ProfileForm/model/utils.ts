export const getDefaultValues = (user?: User): ProfileFormValues => ({
	name: user?.name ?? '',
	email: user?.email ?? '',
	avatarPath: user?.avatarPath ?? '',
	about: user?.about ?? '',
	password: '',
});

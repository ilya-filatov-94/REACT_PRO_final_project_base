import { configureStore } from '@reduxjs/toolkit';
import AppApi from '../../shared/api/ApiServise';
import { authApi } from '../../features/Auth';
import { productsApi } from '../../entities/product';
import { usersApi } from '../../entities/user';
import { rootReducer } from './rootReducer';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: AppApi,
			},
		}).concat([
			authApi.middleware,
			productsApi.middleware,
			usersApi.middleware,
		]),
});

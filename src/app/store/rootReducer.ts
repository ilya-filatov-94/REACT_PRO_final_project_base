import { combineReducers } from 'redux';
import { userSlice, usersApi } from '../../entities/user';
import { cartSlice } from '../../features/Cart';
import { productsSlice, productsApi } from '../../entities/product';
import { authApi } from '../../features/Auth';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
});

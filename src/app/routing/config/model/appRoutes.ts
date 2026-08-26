export const AppRoutes = {
	HOME: 'home',
	FAVORITES: 'favorites',
	PRODUCTS: 'products',
	PROFILE: 'profile',
	CART: 'cart',
	SIGNUP: 'signup',
	SIGNIN: 'signin',
	NOT_FOUND: 'not_found',
} as const;

export type AppRoutesType = (typeof AppRoutes)[keyof typeof AppRoutes];

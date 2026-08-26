import { AppRoutes, type AppRoutesType } from './appRoutes';

type RoutePathValue = `${string}` | '*';

export const RoutePath = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.FAVORITES]: 'favorites',
	[AppRoutes.PRODUCTS]: 'products/:productId',
	[AppRoutes.PROFILE]: 'profile',
	[AppRoutes.CART]: 'cart',
	[AppRoutes.SIGNUP]: 'signup',
	[AppRoutes.SIGNIN]: 'signin',
	[AppRoutes.NOT_FOUND]: '*',
} as const satisfies Record<AppRoutesType, RoutePathValue>;

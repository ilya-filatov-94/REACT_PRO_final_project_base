import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SignUpPage } from 'pages/SignUpPage';
import { SignInPage } from 'pages/SignInPage';
import { App } from '../../../app';
import { WithProtection } from '../../providers/auth/WithProtection';
import { RoutePath } from './model';

const HomePage = lazy(() =>
	import('pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const HomePageWithProtection = WithProtection(HomePage);

const FavoritesPage = lazy(() =>
	import('pages/FavoritesPage').then((module) => ({
		default: module.FavoritesPage,
	}))
);
const FavoritesPageWithProtection = WithProtection(FavoritesPage);

const ProductPage = lazy(() =>
	import('pages/ProductPage').then((module) => ({
		default: module.ProductPage,
	}))
);
const ProductPageWithProtection = WithProtection(ProductPage);

const ProfilePage = lazy(() =>
	import('pages/ProfilePage').then((module) => ({
		default: module.ProfilePage,
	}))
);
const ProfilePageWithProtection = WithProtection(ProfilePage);

const CartPage = lazy(() =>
	import('pages/CartPage').then((module) => ({
		default: module.CartPage,
	}))
);

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePageWithProtection />,
			},
			{
				path: RoutePath.favorites,
				element: <FavoritesPageWithProtection />,
			},
			{
				path: RoutePath.products,
				element: <ProductPageWithProtection />,
			},
			{
				path: RoutePath.profile,
				element: <ProfilePageWithProtection />,
			},
			{
				path: RoutePath.cart,
				element: <CartPage />,
			},
		],
	},
	{
		path: RoutePath.signin,
		element: <SignInPage />,
	},
	{
		path: RoutePath.signup,
		element: <SignUpPage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);

import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../../../pages/HomePage';
import { ProductPage } from '../../../pages/ProductPage';
import { NotFoundPage } from '../../../pages/NotFoundPage';
import { ProfilePage } from '../../../pages/ProfilePage';
import { FavoritesPage } from '../../../pages/FavoritesPage';
import { App } from '../../../app';
import { SignUpPage } from '../../../pages/SignUpPage';
import { SignInPage } from '../../../pages/SignInPage';
import { CartPage } from '../../../pages/CartPage';
import { WithProtection } from '../../providers/auth/WithProtection';

import { RoutePath } from './model';

const HomePageWithProtection = WithProtection(HomePage);
const FavoritesPageWithProtection = WithProtection(FavoritesPage);
const ProductPageWithProtection = WithProtection(ProductPage);
const ProfilePageWithProtection = WithProtection(ProfilePage);

export const router = createBrowserRouter([
	{
		// Основной layout для большинства страниц
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
	// Страницы аутентификации без общего layout
	{
		path: RoutePath.signin,
		element: <SignInPage />,
	},
	{
		path: RoutePath.signup,
		element: <SignUpPage />,
	},
	// Страница 404 вне layout
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);

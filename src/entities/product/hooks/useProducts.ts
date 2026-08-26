import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { userSelectors } from 'entities/user';
import { useAppSelector } from 'shared/store/utils';
import { isLiked } from 'shared/utils';
import { productsSelectors } from '../model/slice';
import { useGetProductsQuery } from '../api/productsApi';

export const useProducts = () => {
	const { pathname } = useLocation();

	const { searchText, page, perPage, sort } = useAppSelector(
		productsSelectors.getProductsState
	);

	const isFavoritesPage = pathname === '/favorites';

	const queryArgs = useMemo(
		() => ({
			searchText,
			sort,
			page,
			perPage: isFavoritesPage ? undefined : perPage,
		}),
		[searchText, sort, page, isFavoritesPage, perPage]
	);
	const { isLoading, isError, error, data, isFetching } =
		useGetProductsQuery(queryArgs);

	const user = useAppSelector(userSelectors.getUser);

	const filteredProducts = useMemo(() => {
		if (!data?.products) return [];
		if (isFavoritesPage) {
			return data.products.filter((product) =>
				isLiked(product.likes, user?.id)
			);
		}
		return data.products;
	}, [data?.products, isFavoritesPage, user?.id]);

	const productsCount = data?.products?.length ?? 0;

	return {
		products: filteredProducts,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};

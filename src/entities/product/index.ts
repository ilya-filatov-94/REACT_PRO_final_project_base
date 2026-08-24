export {
	useGetProductQuery,
	useGetProductsQuery,
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	productsApi,
	type IErrorResponse,
} from './api/productsApi';
export {
	productsSlice,
	productsSelectors,
	productsActions,
} from './model/slice';
export { useProducts } from './hooks/useProducts';

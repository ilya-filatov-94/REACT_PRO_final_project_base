import { WithQuery } from '../../../shared/api/HOCs/WithQuery';
import { useProducts } from '../../../entities/product';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { CardList } from '../../../widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = () => {
	const { isLoading, isError, products, error } = useProducts();

	return (
		<>
			<br />
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
};

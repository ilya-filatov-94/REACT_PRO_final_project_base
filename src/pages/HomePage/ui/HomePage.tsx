import { CardList } from 'widgets/CardList';
import { Sort } from 'features/Sort';
import { LoadMore } from 'features/LoadMore';
import { useProducts } from 'entities/product';
import { WithQuery } from 'shared/api/HOCs/WithQuery';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = () => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<Sort />
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
};

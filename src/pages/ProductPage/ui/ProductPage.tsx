import { useParams } from 'react-router-dom';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { Sort } from '../../../features/Sort';
import { ReviewList } from '../../../widgets/ReviewList';
import { ProductDetails } from '../../../widgets/ProductDetails';
import { ProductInfo } from '../../../widgets/ProductInfo';
import { useGetProductQuery } from '../../../entities/product';

export const ProductPage = () => {
	const { productId = '' } = useParams<{ productId: string }>();

	const { data: product } = useGetProductQuery(
		{ id: productId },
		{ skip: productId === '' }
	);

	if (!product) {
		return <></>;
	}

	return (
		<>
			<ButtonBack />
			<Sort />
			<ProductDetails product={product} />
			<ProductInfo product={product} />
			<ReviewList product={product} />
		</>
	);
};

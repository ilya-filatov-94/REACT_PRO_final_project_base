import { ProductCartCounter } from '../ProductCartCounter/ProductCartCounter';
import { CartCounter } from '../CartCounter/CartCounter';
import { useAppSelector } from '../../../../shared/store/utils';
import { cartSelectors } from '../../model/slice';

type CartItemProps = {
	product: Product;
};

export const ProductCartControls = ({ product }: CartItemProps) => {
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const isInCart = !!cartProducts.find((p) => p.id === product.id);

	return isInCart ? (
		<CartCounter productId={product.id} />
	) : (
		<ProductCartCounter product={product} />
	);
};

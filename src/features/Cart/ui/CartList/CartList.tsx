import classNames from 'classnames';
import { useAppSelector } from 'shared/store/utils';
import { cartSelectors } from '../../model';
import { Cart } from '../Cart/Cart';
import s from './CartList.module.css';

export const CartList = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<Cart product={p} key={p.id} />
			))}
		</div>
	);
};

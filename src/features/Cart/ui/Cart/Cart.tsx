import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import TrashIcon from 'shared/assets/icons/trash.svg?react';
import { ImageWithFallback } from 'shared/ui/ImageWithFallback';
import { cartActions } from '../../model/slice';
import { CartCounter } from '../CartCounter/CartCounter';
import s from './Cart.module.css';

type CartItemProps = {
	product: CartProduct;
};

export const Cart = memo(({ product }: CartItemProps) => {
	const dispatch = useDispatch();
	const { id, name, images, price, discount } = product;

	const handleDelete = () => {
		dispatch(cartActions.deleteCartProduct(id));
	};
	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<ImageWithFallback
					src={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
					loading='lazy'
				/>
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<CartCounter productId={id} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span
										className={classNames(s['price_old'], s['price_right'])}>
										{price}
									</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<button className={classNames(s['cart-item__bnt-trash'])}>
							<TrashIcon onClick={handleDelete} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

Cart.displayName = 'Cart'; // для ESLint

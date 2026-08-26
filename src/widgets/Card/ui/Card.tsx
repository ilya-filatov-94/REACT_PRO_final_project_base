import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { LikeButton } from 'features/LikeButton';
import { CartCounter, cartSelectors, useAddToCart } from 'features/Cart';
import { useAppSelector } from 'shared/store/utils';
import { Price } from 'shared/ui/Price';
import { ImageWithFallback } from 'shared/ui/ImageWithFallback';
import s from './Card.module.css';

type CardProps = {
	product: Product;
};

export const Card = memo(({ product }: CardProps) => {
	const { discount, price, name, tags, id, images } = product;
	const isProductInCart = useAppSelector((state) =>
		cartSelectors.getCartProducts(state).some((p) => p.id === id)
	);
	const { addProductToCart } = useAddToCart();

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<ImageWithFallback
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<button
					onClick={() => addProductToCart({ ...product, count: 1 })}
					disabled={isProductInCart}
					className={classNames(
						s['card__cart'],
						s['card__btn'],
						s['card__btn_type_primary']
					)}>
					В корзину
				</button>
			)}
		</article>
	);
});

Card.displayName = 'Card'; // для ESLint, который не видит у завёрнутых в React.memo

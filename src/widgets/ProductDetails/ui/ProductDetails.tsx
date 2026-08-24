import { memo } from 'react';
import classNames from 'classnames';
import truckSVG from 'shared/assets/icons/truck.svg?url';
import qualitySVG from 'shared/assets/icons/quality.svg?url';
import { Price } from 'shared/ui/Price';
import { Rating } from 'shared/ui/Rating';
import { LikeButton } from 'features/LikeButton';
import { ProductCartControls } from 'features/Cart';
import { ImageWithFallback } from 'shared/ui/ImageWithFallback';
import s from './ProductDetails.module.css';

type ProductDetailsProps = {
	product: Product;
};

export const ProductDetails = memo(({ product }: ProductDetailsProps) => {
	const { name, images, description, price, discount } = product;

	return (
		<>
			<h1 className={classNames(s['header-title'])}>{name}</h1>
			<p className='acticul'>
				Артикул: <b>2388907</b>
			</p>
			<Rating rating={3} />
			<div className={classNames(s['product'])}>
				<div className={classNames(s['product__img-wrapper'])}>
					<ImageWithFallback src={images} alt={description} loading='lazy' />
				</div>
				<div className={classNames(s['product__desc'])}>
					<Price price={price} discountPrice={discount} />
					<ProductCartControls product={product} />
					<LikeButton product={product} />
					<div className={classNames(s['product__delivery'])}>
						<ImageWithFallback src={truckSVG} alt='truck' loading='lazy' />
						<div className={classNames(s['product__right'])}>
							<h3 className={classNames(s['product__name'])}>
								Доставка по всему Миру!
							</h3>
							<p className={classNames(s['product__text'])}>
								Доставка курьером — <span className='bold'> от 399 ₽</span>
							</p>
							<p className={classNames(s['product__text'])}>
								Доставка в пункт выдачи —
								<span className={classNames(s['product__bold'])}>
									{' '}
									от 199 ₽
								</span>
							</p>
						</div>
					</div>
					<div className={classNames(s['product__delivery'])}>
						<ImageWithFallback src={qualitySVG} alt='quality' loading='lazy' />
						<div className={classNames(s['product__right'])}>
							<h3 className={classNames(s['product__name'])}>
								Гарантия качества
							</h3>
							<p className={classNames(s['product__text'])}>
								Если Вам не понравилось качество нашей продукции, мы вернем
								деньги, либо сделаем все возможное, чтобы удовлетворить ваши
								нужды.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

ProductDetails.displayName = 'ProductDetails'; // для ESLint

import { Fragment } from 'react';
import classNames from 'classnames';
import { configInfo } from '../model/config';
import s from './ProductInfo.module.css';

type ProductInfoProps = {
	product: Product;
};

export const ProductInfo = ({ product }: ProductInfoProps) => {
	return (
		<div className={classNames(s['product__box'])}>
			<h2 className={classNames(s['product__title'])}>Описание</h2>
			<p className={classNames(s['product__subtitle'])}>
				{product?.description || '-'}
			</p>
			<h2 className={classNames(s['product__title'])}>Характеристики</h2>
			<div className={classNames(s['product__grid'])}>
				{configInfo.map((item) => (
					<Fragment key={item.label}>
						<div className={s['product__naming']}>{item.label}</div>
						<div className={s['product__description']}>
							{
								(item?.renderValue?.(product) ||
									product?.[item?.value] ||
									'') as string
							}
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
};

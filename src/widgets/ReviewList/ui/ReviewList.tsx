import classNames from 'classnames';
import { ReviewCard } from '../../ReviewCard';
import { ReviewForm } from './ReviewForm/ReviewForm';
import s from './ReviewList.module.css';

type ReviewListProps = {
	product: Product;
};

export const ReviewList = ({ product }: ReviewListProps) => {
	return (
		<div className={classNames(s['product__reviews'])}>
			{product.reviews.map((review) => (
				<ReviewCard key={review.id} review={review} />
			))}

			<h2>Отзыв о товаре {product.name}</h2>
			<ReviewForm />
		</div>
	);
};

import { memo } from 'react';
import { Rating } from 'shared/ui/Rating';
import s from './ReviewCard.module.css';

type ReviewCardProps = {
	review: Review;
};

export const ReviewCard = memo(({ review }: ReviewCardProps) => {
	return (
		<div className={s['review']} key={review.id}>
			<div className={s['review__header']}>
				<div className={s['review__name']}>{review.user.name}</div>
				<div className={s['review__date']}>
					{new Date(review.createdAt).toLocaleDateString('ru-RU')}
				</div>
			</div>
			<Rating rating={review.rating} />
			<p className={s['review__text']}>{review.text}</p>
		</div>
	);
});

ReviewCard.displayName = 'ReviewCard'; // для ESLint

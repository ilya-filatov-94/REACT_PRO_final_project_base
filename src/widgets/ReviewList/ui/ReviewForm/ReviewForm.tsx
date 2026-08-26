import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import { Rating } from 'shared/ui/Rating';
import s from './ReviewForm.module.css';

type ReviewFormProps = {
	onSubmit: (data: { text: string; rating: number }) => void;
	isSubmitting?: boolean;
};

export const ReviewForm = ({
	onSubmit,
	isSubmitting = false,
}: ReviewFormProps) => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(e.target.value);
	};

	const handleSubmit = (e: ChangeEvent) => {
		e.preventDefault();
		if (!reviewText.trim() || rating === 0) {
			return;
		}
		onSubmit({ text: reviewText, rating });
		setReviewText('');
		setRating(0);
	};

	return (
		<form className={s['form']} onSubmit={handleSubmit}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={reviewText}
				onChange={handleChange}
			/>
			<button
				type='submit'
				className={classNames(s['form__btn'], s['pramary'])}
				disabled={isSubmitting}>
				{isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
			</button>
		</form>
	);
};

import { useOptimistic, useTransition, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { ReviewCard } from '../../ReviewCard';
import { ReviewForm } from './ReviewForm/ReviewForm';
import { useCreateReviewProductMutation } from 'entities/product'; // правильный хук
import { useAppSelector } from 'shared/store/utils';
import { userSelectors } from 'entities/user';
import { getMessageFromError } from 'shared/utils';
import s from './ReviewList.module.css';

type ReviewListProps = {
	product: Product;
};

export const ReviewList = ({ product }: ReviewListProps) => {
	const user = useAppSelector(userSelectors.getUser);
	const [createReviewProduct, { isLoading: isCreating }] =
		useCreateReviewProductMutation();
	const [, startTransition] = useTransition();

	const baseReviews = product.reviews;

	const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		baseReviews,
		(_currentReviews, newReviews: Review[]) => newReviews
	);

	const sortedReviews = useMemo(() => {
		return [...optimisticReviews].sort(
			(a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		);
	}, [optimisticReviews]);

	const handleAddReview = useCallback(
		async (reviewData: { text: string; rating: number }) => {
			if (!user) {
				toast.warning('Необходимо авторизоваться');
				return;
			}

			const tempReview: Review = {
				id: crypto.randomUUID(),
				text: reviewData.text,
				rating: reviewData.rating,
				createdAt: new Date().toISOString(),
				user: user as User,
				product: product as unknown as ReviewProduct,
			};

			// Оптимистично добавляем
			startTransition(() => {
				setOptimisticReviews([...optimisticReviews, tempReview]);
			});

			try {
				await createReviewProduct({
					productId: product.id,
					text: reviewData.text,
					rating: reviewData.rating,
				}).unwrap();

				toast.success('Отзыв добавлен');
				// После успеха RTK Query обновит product.reviews, и baseReviews изменится,
				// useOptimistic автоматически вернёт новое базовое значение
			} catch (error) {
				// Откатываем к исходному списку
				startTransition(() => {
					setOptimisticReviews(baseReviews);
				});
				toast.error(getMessageFromError(error, 'Не удалось добавить отзыв'));
			}
		},
		[
			createReviewProduct,
			product,
			user,
			baseReviews,
			optimisticReviews,
			setOptimisticReviews,
		]
	);

	return (
		<div className={classNames(s['product__reviews'])}>
			{sortedReviews.map((review) => (
				<ReviewCard key={review.id} review={review} />
			))}

			<h2>Отзыв о товаре {product.name}</h2>
			<ReviewForm onSubmit={handleAddReview} isSubmitting={isCreating} />
		</div>
	);
};

import { memo } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import LikeSvg from 'shared/assets/icons/like.svg?react';
import { useAppSelector } from 'shared/store/utils';
import { userSelectors } from 'entities/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	type IErrorResponse,
} from 'entities/product';
import s from './LikeButton.module.css';

type TLikeButtonProps = {
	product: Product;
};

export const LikeButton = memo(({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product?.likes.some((l) => l.userId === user?.id);

	const toggleLike = async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}
		let response;
		if (isLike) {
			response = await deleteLike({ id: `${product.id}` });
		} else {
			response = await setLike({ id: `${product.id}` });
		}

		if (response.error) {
			const error = response.error as IErrorResponse;
			toast.error(error.data.message);
		}
	};

	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	);
});

LikeButton.displayName = 'LikeButton'; // для ESLint

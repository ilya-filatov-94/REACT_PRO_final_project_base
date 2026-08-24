import classNames from 'classnames';
import s from './Header.module.css';
import { Logo } from '../../../shared/ui/Logo';
import { Search } from '../../../features/Search';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../shared/store/utils';
import { userSelectors } from '../../../entities/user';
import { isLiked } from '../../../shared/utils';
import { useProducts } from '../../../entities/product';
import { cartSelectors } from '../../../features/Cart';
import LikeIcon from '../../../shared/assets/icons/like.svg';
import CartIcon from '../../../shared/assets/icons/cartIcon.svg';
import UserIcon from '../../../shared/assets/icons/userIcon.svg';

export const Header = () => {
	const { products } = useProducts();
	const user = useAppSelector(userSelectors.getUser);
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);

	const likeCount = products.filter((product) =>
		isLiked(product.likes, user?.id)
	).length;

	const accessToken = useAppSelector(userSelectors.getAccessToken);

	return (
		<header className={s.header}>
			<div className={classNames('container', s.header__wrapper)}>
				<Logo />
				<Search />
				<div className={s['header__icons-menu']}>
					<Link className={s['header__favorites-link']} to='/favorites'>
						<LikeIcon />
						<span className={s['header__icon-bubble']}>{likeCount}</span>
					</Link>
					<Link className={s['header__favorites-link']} to='/cart'>
						<CartIcon />
						<span className={s['header__icon-bubble']}>
							{cartProducts.length}
						</span>
					</Link>
					{accessToken && (
						<>
							<Link className={s['header__icons-menu-item']} to='/profile'>
								<UserIcon />
							</Link>
							<Link className={s['header__icons-menu-item']} to={'/signin'}>
								Выйти
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

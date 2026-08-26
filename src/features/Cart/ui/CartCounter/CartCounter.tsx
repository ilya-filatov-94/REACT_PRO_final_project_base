import classNames from 'classnames';
import { useCartItemCount } from '../../hooks/useCartItemCount';
import s from './CartCounter.module.css';

type TCartCounter = {
	productId: string;
};

export const CartCounter = ({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCartItemCount(productId);

	return (
		<>
			<div className={classNames(s['button-count'])}>
				<button
					onClick={handleDecrement}
					className={classNames(s['button-count__minus'])}>
					-
				</button>
				<input
					onChange={handleSetCount}
					type='number'
					className={classNames(s['button-count__num'])}
					value={count}
				/>
				<button
					onClick={handleIncrement}
					className={classNames(s['button-count__plus'])}
					disabled={count >= stock}>
					+
				</button>
			</div>
		</>
	);
};

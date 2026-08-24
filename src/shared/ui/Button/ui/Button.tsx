import s from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary';
	maxContent?: boolean;
};

export const Button = ({
	variant = 'primary',
	maxContent = false,
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			className={classNames(
				s.button,
				variant === 'secondary' ? s.secondary : s.primary,
				maxContent && s.maxContent,
				className
			)}
			{...props}
		/>
	);
};

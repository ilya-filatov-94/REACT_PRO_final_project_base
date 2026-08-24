import s from './Input.module.css';
import classNames from 'classnames';
import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	id: string;
	className?: string;
	errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, id, className, errorMessage, ...props }, ref) => {
		return (
			<div className={s.wrapper}>
				<label className={s.label}>
					{label && <span className={s.labelText}>{label}</span>}
					<input
						id={id}
						className={classNames(s.input, className)}
						ref={ref}
						{...props}
					/>
				</label>
				{errorMessage && errorMessage !== '' && (
					<span className={s.errorText}>{errorMessage}</span>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

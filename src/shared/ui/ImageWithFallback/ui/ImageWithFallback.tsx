import { useState } from 'react';
import s from './ImageWithFallback.module.css';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	fallback?: React.ReactNode;
};

export const ImageWithFallback = ({
	fallback,
	className,
	alt,
	...props
}: ImageWithFallbackProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const wrapperClassName = [s.wrapper, className].filter(Boolean).join(' ');

	return (
		<div className={wrapperClassName}>
			{isLoading && !hasError && (
				<div className={s.spinner} aria-label='Загрузка изображения' />
			)}
			{hasError ? (
				<div className={s.error}>{alt || 'Ошибка загрузки'}</div>
			) : (
				<img
					{...props}
					alt={alt}
					className={[
						s.image,
						isLoading ? s.image_hidden : s.image_visible,
					].join(' ')}
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false);
						setHasError(true);
					}}
				/>
			)}
			{fallback && isLoading && !hasError && (
				<div className={s.fallbackContent}>{fallback}</div>
			)}
		</div>
	);
};

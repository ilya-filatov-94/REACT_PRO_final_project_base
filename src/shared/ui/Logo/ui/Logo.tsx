import { Link } from 'react-router-dom';
import LogoIcon from '../../../assets/icons/logo.svg?url';
import { ImageWithFallback } from '../../ImageWithFallback';
import s from './Logo.module.css';

export const Logo = () => {
	return (
		<Link to='/'>
			<ImageWithFallback
				src={LogoIcon}
				alt='Логотип компании'
				className={s['logo__pic']}
				loading='lazy'
			/>
		</Link>
	);
};

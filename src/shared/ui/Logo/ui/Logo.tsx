import { Link } from 'react-router-dom';
import LogoIcon from '../../../assets/icons/logo.svg?url';
import s from './Logo.module.css';

export const Logo = () => {
	return (
		<Link to='/'>
			<img className={s['logo__pic']} src={LogoIcon} alt='Логотип компании' />
		</Link>
	);
};

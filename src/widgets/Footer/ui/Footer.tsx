import classNames from 'classnames';
import Instagram from 'shared/assets/images/instagram.svg?url';
import Telegram from 'shared/assets/images/telegram.svg?url';
import Viber from 'shared/assets/images/viber.svg?url';
import Vk from 'shared/assets/images/vk.svg?url';
import Whatsapp from 'shared/assets/images/whatsapp.svg?url';
import { Logo } from 'shared/ui/Logo';
import { ImageWithFallback } from 'shared/ui/ImageWithFallback';
import s from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className='container'>
				<div className={s['footer__wrapper']}>
					<div className={s['footer__col']}>
						<Logo />
						<p className={s['footer__copyright']}>
							© «Интернет-магазин DogFood.ru»
						</p>
					</div>
					<div className={s['footer__col']}>
						<nav className={s['menu-bottom']}>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Каталог
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Акции
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Новости
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Отзывы
							</a>
						</nav>
					</div>
					<div className={s['footer__col']}>
						<nav className={s['menu-bottom']}>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Оплата и доставка
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Часто спрашивают
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Обратная связь
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Контакты
							</a>
						</nav>
					</div>
					<div className={s['footer__col']}>
						<div className={s['contacts']}>
							<p className={s['contacts__title']}>Мы на связи</p>
							<a
								className={classNames(s['contacts__tel'], s['contacts__link'])}
								href='tel:89177172179'>
								8 (999) 00-00-00
							</a>
							<a
								className={classNames(s['contacts__mail'], s['contacts__link'])}
								href='mailto:hordog.ru@gmail.com'>
								dogfood.ru@gmail.com
							</a>
							<ul className={classNames(s['socials'])}>
								<li>
									<a className={s['socials__link']} href='/#'>
										<ImageWithFallback
											src={Telegram}
											alt='telegram'
											loading='lazy'
										/>
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#'>
										<ImageWithFallback
											src={Whatsapp}
											alt='whatsapp'
											loading='lazy'
										/>
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#'>
										<ImageWithFallback src={Viber} alt='viber' loading='lazy' />
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#'>
										<ImageWithFallback
											src={Instagram}
											alt='instagram'
											loading='lazy'
										/>
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#'>
										<ImageWithFallback src={Vk} alt='vk' loading='lazy' />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

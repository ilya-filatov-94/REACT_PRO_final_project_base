import { useState, useEffect, useRef, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import classNames from 'classnames';
import { getModalContainer } from './utils';
import s from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	title: string;
	body: ReactNode;
	closeHandler: () => void;
};

export const Modal: FC<ModalProps> = ({ isOpen, ...props }) => {
	const [innerIsOpen, setInnerIsOpen] = useState(false);
	const [additionalClasses, setAdditionalClasses] = useState('');
	const returnFocusRef = useRef<HTMLElement | null>(null);
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const innerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const modalContainer = getModalContainer();

	useEffect(() => {
		if (isOpen) {
			returnFocusRef.current = document.activeElement as HTMLElement;

			setAdditionalClasses(s['myModal__overlay--open']);
		} else {
			setAdditionalClasses('');
			if (returnFocusRef.current) {
				closeTimeoutRef.current = setTimeout(() => {
					returnFocusRef.current?.focus();
					returnFocusRef.current = null;
				}, 500);
			}
		}

		innerTimeout.current = setTimeout(
			() => {
				setInnerIsOpen(isOpen);
			},
			isOpen ? 250 : 500
		);

		return () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current);
				closeTimeoutRef.current = null;
			}
			if (innerTimeout.current) {
				clearTimeout(innerTimeout.current);
				innerTimeout.current = null;
			}
		};
	}, [isOpen]);

	if (!modalContainer || (!isOpen && !innerIsOpen)) return null;

	return createPortal(
		<div className={classNames(s['myModal__overlay'], additionalClasses)}>
			{innerIsOpen && <ModalInner {...props} isOpen={isOpen} />}
		</div>,
		modalContainer
	);
};

const ModalInner: FC<ModalProps> = ({ title, body, closeHandler, isOpen }) => {
	const ref = useRef<HTMLDivElement>(null);
	const refCloseButton = useRef<HTMLButtonElement | null>(null);
	const [additionalClasses, setAdditionalClasses] = useState('');

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				closeHandler();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeHandler();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [closeHandler]);

	useEffect(() => {
		setAdditionalClasses(isOpen ? s['myModal__container--open'] : '');
		if (refCloseButton.current && isOpen) {
			refCloseButton.current.focus();
		}
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<div
			ref={ref}
			className={classNames(s['myModal__container'], additionalClasses)}>
			<div className={s['myModal__header']}>
				<span className={s['myModal__title']}>{title}</span>
				<button
					ref={refCloseButton}
					onClick={closeHandler}
					className={s['myModal__closeButton']}>
					<CloseOutlinedIcon />
				</button>
			</div>
			<div>{body}</div>
		</div>
	);
};

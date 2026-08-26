import { type ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import { ID_CONTAINER } from './consts';

export const ModalContainer = (): ReactPortal => {
	return createPortal(<div id={ID_CONTAINER} />, document.body);
};

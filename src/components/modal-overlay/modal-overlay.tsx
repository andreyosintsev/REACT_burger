import { FC, ReactNode, MouseEventHandler } from 'react';

import ModalOverlayStyles from './modal-overlay.module.css';

type TModalOverlay = {
  onClick: () => void;
}

const ModalOverlay: FC<TModalOverlay> = ({onClick}) => {
  return (
    <div className={ModalOverlayStyles.overlay} id="overlay" onClick={onClick} ></div>
  );
}

export default ModalOverlay
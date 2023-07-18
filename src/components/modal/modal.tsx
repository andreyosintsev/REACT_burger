import { FC, ReactNode, useEffect, useCallback } from 'react';

import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import ModalStyles from './modal.module.css';

type TModal = {
  onClick: () => void;
  children?: ReactNode;
} 

const Modal: FC<TModal> = ({onClick, children}) => {

  const onEscDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClick();
    }
  }, [onClick]);

  useEffect (()=>{
    document.addEventListener('keydown', onEscDown);            
            
    return ()=> {
      document.removeEventListener('keydown', onEscDown);
    };
  }, [onEscDown]);
  
  const modalRoot: HTMLElement | null = document.querySelector("#modals");

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClick={onClick} />
        <div className={`${ModalStyles.modal} pr-10 pb-15`} onClick={e => e.stopPropagation()}>
          <div className={ModalStyles.modal_close}>
            <CloseIcon type="primary" onClick={onClick}/>
          </div>
          {children}
        </div>
      </>
    ), 
    modalRoot!
  );
}

export default Modal
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import ModalStyles from './modal.module.css';

function Modal({onClick, children}) {

  const modalRoot = document.querySelector("#modals");

  const onEscDown = (e) => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  useEffect (()=>{
    document.addEventListener('keydown', onEscDown);            
            
    return ()=> {
      document.removeEventListener('keydown', onEscDown);
    };
  }, []);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClick={onClick} />
        <div className={`${ModalStyles.modal} pr-10 pb-15`} onClick={e => e.stopPropagation()}>
          <div className={ModalStyles.modal_close}>
            <CloseIcon type="primary" onClick={onClick} id="closeIcon"/>
          </div>
          {children}
        </div>
      </>
    ), 
    modalRoot
  );
}

Modal.propTypes = {
  onClick:   PropTypes.func.isRequired,
  children:  PropTypes.node
}

export default Modal
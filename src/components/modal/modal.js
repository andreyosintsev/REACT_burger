import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import ModalStyles from './modal.module.css';

function Modal({onclick, children}) {

  const modalRoot = document.querySelector("#modals");

  const onEscDown = (e) => {
    if (e.code === 'Escape') {
      let event = new Event('click', {bubbles:true});
      document.querySelector('#overlay').dispatchEvent(event);
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
      <ModalOverlay onclick={onclick} />
      <div className={`${ModalStyles.modal} pr-10 pb-15`} onClick={e => e.stopPropagation()}>
        <div className={ModalStyles.modal_close}>
          <CloseIcon type="primary" onClick={onclick} id="closeIcon"/>
        </div>
        {children}
      </div>
      </>
    ), 
    modalRoot
  );
}

Modal.propTypes = {
  onclick:   PropTypes.func.isRequired,
  children:  PropTypes.node
}

export default Modal
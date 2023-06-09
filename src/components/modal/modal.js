import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import ModalStyles from './modal.module.css';

function Modal({onclick, header, children}) {

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
      <div className={`${ModalStyles.modal} pt-10 pr-10 pb-15 pl-10`} onClick={e => e.stopPropagation()}>
        <div className={`${ModalStyles.modal_header} mt-5`}>
          <p className="text text_type_main-large">{header}</p>
          <div className={ModalStyles.modal_close}>
            <CloseIcon type="primary" onClick={onclick} id="closeIcon"/>
          </div>
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
  header:    PropTypes.string,
  children:  PropTypes.node
}

export default Modal
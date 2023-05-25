import PropTypes from 'prop-types';

import ModalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({onclick, children}) {
  return (
    <div className={ModalOverlayStyles.overlay} id="overlay" onClick={onclick} >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onclick:  PropTypes.func.isRequired,
  children: PropTypes.node
}

export default ModalOverlay
import PropTypes from 'prop-types';

import ModalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({onClick, children}) {
  return (
    <div className={ModalOverlayStyles.overlay} id="overlay" onClick={onClick} >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onClick:  PropTypes.func.isRequired,
  children: PropTypes.node
}

export default ModalOverlay
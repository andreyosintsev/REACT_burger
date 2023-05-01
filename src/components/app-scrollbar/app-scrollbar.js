import React from 'react';
import PropTypes from 'prop-types';

import AppScrollbarStyles from './app-scrollbar.module.css';

function AppScrollbar(props) {  
  return (
    <div className={AppScrollbarStyles.cover} style={props.style}>
      {props.children}
    </div>
  );
}

AppScrollbar.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
}

export default AppScrollbar
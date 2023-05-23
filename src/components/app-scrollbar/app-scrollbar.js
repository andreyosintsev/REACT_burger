import React from 'react';
import PropTypes from 'prop-types';

import AppScrollbarStyles from './app-scrollbar.module.css';

function AppScrollbar(props) {  
  return (
    <div className={`${AppScrollbarStyles.cover} ingredientsViewport`} style={props.style}>
      {props.children}
    </div>
  );
}

AppScrollbar.propTypes = {
  style: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default AppScrollbar
import PropTypes from 'prop-types';

import AppScrollbarStyles from './app-scrollbar.module.css';

function AppScrollbar({style, children}) {  
  return (
    <div className={`${AppScrollbarStyles.cover} ingredientsViewport`} style={style}>
      {children}
    </div>
  );
}

AppScrollbar.propTypes = {
  style: PropTypes.object,            //Дополнительные стили могут быть, а могут и не быть
  children: PropTypes.node.isRequired
}

export default AppScrollbar
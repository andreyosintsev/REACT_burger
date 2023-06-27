import { FC, ReactNode, CSSProperties } from 'react';

import AppScrollbarStyles from './app-scrollbar.module.css';

type TAppScrollbar = {
  style?: CSSProperties;
  children: ReactNode;
};

const AppScrollbar: FC<TAppScrollbar> = ({style, children}) => {  
  return (
    <div className={`${AppScrollbarStyles.cover} ingredientsViewport`} style={style}>
      {children}
    </div>
  );
}

export default AppScrollbar
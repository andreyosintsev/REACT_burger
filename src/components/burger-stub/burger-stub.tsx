import { FC } from 'react';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerStubStyles from './burger-stub.module.css';

const BurgerStub: FC<{text: string}> = ({text}) => {
  return (
    <div className = {BurgerStubStyles.stub}>
      <Logo /> 
      <p className = {`${BurgerStubStyles.text} text text_type_main-default text_color_inactive mt-4`}>{text}</p>
    </div>
  )
}

export default BurgerStub
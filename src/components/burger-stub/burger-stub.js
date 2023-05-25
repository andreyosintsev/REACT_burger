import PropTypes from 'prop-types';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerStubStyles from './burger-stub.module.css';

function BurgerStub({text}) {
  return (
    <div className = {BurgerStubStyles.stub}>
      <Logo /> 
      <p className = {`${BurgerStubStyles.text} text text_type_main-default text_color_inactive mt-4`}>{text}</p>
    </div>
  )
}

BurgerStub.propTypes = {
  text: PropTypes.string.isRequired
}

export default BurgerStub
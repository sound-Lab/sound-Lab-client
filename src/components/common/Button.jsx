import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../theme';

const StyledButton = styled.button`
  width: ${(props) => props.width + 'px'};
  height: ${(props) => props.height + 'px'};
  margin: auto;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: large;
  background-color: ${(props) => props.buttonColor};
  color: white;
  transition-property: scale, translateY;
  transition: scale 300ms ease-in;

  &:hover {
    transform: scale(0.97);
    opacity: 80%;
    background-color: ${({ theme }) => theme.background.modal};
    color: ${({ theme }) => theme.buttonColors.main};
  }
`;

function Button({ onClick, text, buttonColor, width, height, disabled }) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      buttonColor={disabled ? theme.background.disable : buttonColor}
      width={width}
      height={height}
      disabled={disabled}>
      {text}
    </StyledButton>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonColor: PropTypes.oneOf(Object.values(theme.background)),
  height: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  buttonColor: theme.buttonColors.main,
  width: 100,
  height: 50,
  disabled: false,
};

export default Button;

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
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  buttonColor: PropTypes.oneOf(Object.values(theme.background)),
  height: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  width: 100,
  height: 50,
  buttonColor: theme.buttonColors.main,
  disabled: false,
};

export default Button;

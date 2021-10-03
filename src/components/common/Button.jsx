import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../theme';

function Button({ type, onClick, text, buttonColor, width, height, disabled }) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      buttonColor={disabled ? theme.grayColors.mediumGray : buttonColor}
      width={width}
      height={height}
      disabled={disabled}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: ${(props) => props.width + 'px'};
  height: ${(props) => props.height + 'px'};
  margin: auto;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: large;
  background-color: ${(props) => props.buttonColor};
  color: ${({ theme }) => theme.grayColors.white};

  &:hover {
    transform: scale(0.97);
    opacity: 80%;
    background-color: ${({ theme }) => theme.MainColors.selectiveYellow};
    color: ${({ theme }) => theme.grayColors.white};
  }
`;

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  buttonColor: PropTypes.oneOf(Object.values(theme.MainColors)),
  height: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  width: 100,
  height: 50,
  buttonColor: theme.MainColors.orangeRed,
  disabled: false,
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../theme';

const StyledButton = styled.button`
  border-radius: 10px;
  border: none;
  margin: auto;
  width: ${(props) => props.width + 'px'};
  height: ${(props) => props.height + 'px'};
  background-color: ${(props) => props.buttonColor};
  color: white;
  font-size: large;
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

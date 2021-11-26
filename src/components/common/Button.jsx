import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../theme';

function Button({
  id,
  onClick,
  text,
  buttonColor,
  fontSize,
  width,
  height,
  disabled,
  className,
}) {
  return (
    <StyledButton
      id={id}
      onClick={onClick}
      buttonColor={disabled ? theme.grayColors.mediumGray : buttonColor}
      fontSize={fontSize}
      width={width}
      height={height}
      disabled={disabled}
      className={className}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: ${(props) => props.width + 'px'};
  height: ${(props) => props.height + 'px'};
  margin: auto;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: ${(props) => props.fontSize + 'px'};
  background-color: ${(props) => props.buttonColor};
  color: ${({ theme }) => theme.grayColors.white};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    transform: scale(0.97);
    opacity: 80%;
    background-color: ${({ theme }) => theme.mainColor.navyBlue};
    color: ${({ theme }) => theme.grayColors.white};
  }
`;

Button.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  buttonColor: PropTypes.oneOf(
    Object.values(theme.mainColor, theme.grayColors),
  ),
  height: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
  fontSize: PropTypes.number,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  width: 100,
  height: 50,
  buttonColor: theme.mainColor.surfieGreen,
  disabled: false,
};

export default Button;

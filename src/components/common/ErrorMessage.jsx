import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorMessage = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.p`
  position: relative;
  margin-top: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.MainColors.surfieGreen};
`;

ErrorMessage.propTypes = {
  children: PropTypes.String,
};

export default ErrorMessage;

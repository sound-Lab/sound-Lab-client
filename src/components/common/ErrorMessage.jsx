import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ErrorMessage({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.p`
  position: relative;
  margin-top: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.mainColor.surfieGreen};
`;

ErrorMessage.propTypes = {
  children: PropTypes.any,
};

export default ErrorMessage;

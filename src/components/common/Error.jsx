import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Error({ error }) {
  return (
    <Wrapper>
      {error}
      <StyledLinkButton to="/" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vw;
`;

const StyledLinkButton = styled(Link)`
  min-width: 80px;
  height: 45px;
  display: inline-block;
  border-radius: 8px;
`;

Error.propTypes = {
  error: PropTypes.any,
};

export default Error;

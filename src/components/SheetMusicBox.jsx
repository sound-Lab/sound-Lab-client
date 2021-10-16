import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SheetMusicBox({ step: { left }, top }) {
  return <MusicBarBox left={left} top={top} />;
}

const MusicBarBox = styled.div`
  position: absolute;
  left: ${(props) => props.left * +'%'};
  width: ${(props) => props.width + '%'};
  top: ${(props) => props.top * 80 + 52 + 'px'};
  height: 73px;
  border-radius: 10px;
  border: solid 2px #0000009e;
  background-color: #2f724b;
  opacity: 0.8;
`;

SheetMusicBox.propTypes = {
  step: PropTypes.any,
  top: PropTypes.any,
};

export default SheetMusicBox;

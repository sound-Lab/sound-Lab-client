import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SheetMusicBox({ left, width, top }) {
  return <MusicBarBox left={left} width={width} top={top} />;
}

const MusicBarBox = styled.div`
  position: absolute;
  left: ${(props) => props.left * 6.25 + '%'};
  width: ${(props) => props.width * 6.25 + '%'};
  top: ${(props) => props.top * 80 + 40 + 'px'};
  height: 79px;
  border-radius: 5px;
  border: solid 0.1px #0000009e;
  background-color: #2f724b;
  opacity: 0.8;
`;

SheetMusicBox.propTypes = {
  left: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
};

export default SheetMusicBox;

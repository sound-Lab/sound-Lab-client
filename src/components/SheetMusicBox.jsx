import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SheetMusicBox({ left, width, top }) {
  const [repeatPart, setRepeatPart] = useState('A');

  const partColor = {
    A: '#113f5f',
    B: '#857364',
  };

  useEffect(() => {
    if (left >= 8) {
      setRepeatPart('B');
    }
  }, [left]);

  return (
    <MusicBarBox
      left={left}
      width={width}
      top={top}
      part={repeatPart}
      color={partColor}>
      {repeatPart}
    </MusicBarBox>
  );
}

const MusicBarBox = styled.div`
  position: absolute;
  display: flex;
  left: ${(props) => props.left * 6.25 + '%'};
  width: ${(props) => props.width * 6.25 + '%'};
  top: ${(props) => props.top * 80 + 40 + 'px'};
  height: 79px;
  box-sizing: border-box;
  border-radius: 8px;
  border: solid 0.1px ${({ theme }) => theme.grayColors.greige};
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.part === 'A' ? props.color.A : props.color.B};
  color: ${({ theme }) => theme.grayColors.white};
  font-weight: 500;
  font-size: 20px;
  transition: border 0.3s;
  opacity: 0.6;

  &:hover {
    border: solid 3px ${({ theme }) => theme.grayColors.white};
  }
`;

SheetMusicBox.propTypes = {
  left: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
  currentInstrument: PropTypes.string,
};

export default SheetMusicBox;

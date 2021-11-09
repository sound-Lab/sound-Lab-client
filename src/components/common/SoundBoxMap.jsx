import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SoundBoxMap({ noteName, tracks, updateStep }) {
  return (
    <SoundColumns>
      {tracks &&
        tracks.map((track, index) => {
          return (
            <div key={`track-${index}`}>
              {noteName && <NoteName>{noteName[index]}</NoteName>}
              {track.steps.map((s, stepIndex) => (
                <SoundBox
                  key={`step-${index}-${stepIndex}`}
                  id={`step-${index}-${stepIndex}`}
                  onClick={() => {
                    updateStep(index, stepIndex);
                  }}
                  className={s === 0 ? 'is-currentIndex' : 'is-active'}
                />
              ))}
            </div>
          );
        })}
    </SoundColumns>
  );
}

SoundBoxMap.propTypes = {
  tracks: PropTypes.any,
  updateStep: PropTypes.any,
  noteName: PropTypes.any,
};

const SoundColumns = styled.div`
  width: 100%;
  overflow: auto;

  div {
    width: 400vh;
    height: 30px;
    display: flex;
    flex-direction: row;
    border: solid 0.01em;
    border-color: ${({ theme }) => theme.mainColor.navyBlue};
  }
`;

const NoteName = styled.div`
  background-color: ${({ theme }) => theme.grayColors.white};
`;

const SoundBox = styled.div`
  background-color: ${({ theme }) => theme.grayColors.white};
  cursor: pointer;
`;

export default SoundBoxMap;

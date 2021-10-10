import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SoundBoxMap({ tracks, updateStep }) {
  return (
    <Rows>
      {tracks &&
        tracks.map((track, index) => {
          return (
            <div key={`track-${index}`}>
              {track.steps.map((s, stepIndex) => {
                return (
                  <RowBox
                    key={`step-${index}-${stepIndex}`}
                    id={`step-${index}-${stepIndex}`}
                    onClick={() => {
                      updateStep(index, stepIndex);
                    }}
                    className={s === 0 ? 'is-currentIndex' : 'is-active'}
                  />
                );
              })}
            </div>
          );
        })}
    </Rows>
  );
}

SoundBoxMap.propTypes = {
  tracks: PropTypes.any,
  updateStep: PropTypes.any,
};

const Rows = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    border: solid 0.01em;
    border-color: ${({ theme }) => theme.MainColors.navyBlue};
  }
`;

const RowBox = styled.div`
  background-color: white;
  cursor: 'pointer';
`;

export default SoundBoxMap;

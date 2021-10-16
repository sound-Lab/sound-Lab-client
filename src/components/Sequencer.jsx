import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { updateStep } from '../modules/mixEditor';
import SoundBoxMap from './common/SoundBoxMap';

function Sequencer() {
  const { tracks, currentTrack } = useSelector((state) => state.mixEditor);
  const { codeName, stepsMap } = tracks[currentTrack].steps;
  const { sampler } = tracks[currentTrack];
  const dispatch = useDispatch();

  function updateSteps(codes, stepIndex) {
    const newStep = [...stepsMap];

    newStep[codes].steps[stepIndex] =
      newStep[codes].steps[stepIndex] === 0 ? 1 : 0;

    sampler.triggerAttackRelease(codeName[codes], 1);
    dispatch(updateStep({ newStep, currentTrack }));
  }

  return (
    <Wrapper>
      <SoundBoxMap
        tracks={stepsMap}
        updateStep={updateSteps}
        noteName={codeName}
      />
    </Wrapper>
  );
}

Sequencer.propTypes = {
  instrument: PropTypes.any,
};

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  width: 80%;
  height: 35%;
  display: flex;
  margin: 10px 0px 15px 0px;
  background-color: darkblue;
`;

export default React.memo(Sequencer);

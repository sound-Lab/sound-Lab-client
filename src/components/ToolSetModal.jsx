import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './common/Button';

function ToolSetModal({ onSubmit }) {
  function setInstrument(ev) {
    const selectedTool = ev.target.id;

    onSubmit(selectedTool);
  }

  return (
    <Wrapper>
      <Button
        text="Drum"
        id="drum"
        onClick={setInstrument}
        width={200}
        height={90}
      />
      <Button
        text="Bass"
        id="bass"
        onClick={setInstrument}
        width={200}
        height={90}
      />
      <Button
        text="Chords"
        id="chords"
        onClick={setInstrument}
        width={200}
        height={90}
      />
      <Button
        text="Piano"
        id="piano"
        onClick={setInstrument}
        width={200}
        height={90}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 70%;
`;

ToolSetModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ToolSetModal;

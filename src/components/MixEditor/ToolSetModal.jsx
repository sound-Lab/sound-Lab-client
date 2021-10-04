import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../common/Button';

function ToolSetModal({ onSubmit }) {
  function setInstrument(ev) {
    const selectedTool = ev.target.innerText;

    onSubmit((oldTools) => [...oldTools, selectedTool]);
  }

  return (
    <Wrapper>
      <Button text="Drum" onClick={setInstrument} width={200} height={90} />
      <Button
        text="Bass Lines"
        onClick={setInstrument}
        width={200}
        height={90}
      />
      <Button
        text="Chords Lines"
        onClick={setInstrument}
        width={200}
        height={90}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  height: 70%;
`;

ToolSetModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ToolSetModal;

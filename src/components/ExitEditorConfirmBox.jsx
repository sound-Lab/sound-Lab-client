import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './common/Button';

function ExitEditorConfirmBox({ onSave, onDelete }) {
  function handleDeleteData() {
    onDelete(true);
  }

  function handleSave() {
    onSave(true);
  }

  return (
    <Wrapper>
      <TextBox>
        <div className="confirm">Save changes?</div>
        <div className="message">
          if your leave without saving. all your change will be lost.
        </div>
      </TextBox>
      <StyledButton text={'Don`t Save'} onClick={handleDeleteData} />
      <StyledButton text={'Save'} onClick={handleSave} />
    </Wrapper>
  );
}

ExitEditorConfirmBox.propTypes = {
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  text-align: center;
  margin: 30px;

  .confirm {
    font-size: 30px;
    font-weight: 400;
  }

  .message {
    font-size: 15px;
    font-weight: 200;
  }
`;

const StyledButton = styled(Button)`
  margin: 10px;
`;

export default ExitEditorConfirmBox;

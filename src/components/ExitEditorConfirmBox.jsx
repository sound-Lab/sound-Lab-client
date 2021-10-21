import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ExitEditorConfirmBox({ onSave, onDelete }) {
  function handleDeleteData() {
    onDelete(true);
  }

  function handleSave() {
    onSave(true);
  }
  return (
    <>
      <div>Save changes?</div>
      <div>if your leave without saving. all your change will be lost.</div>
      <button onClick={handleDeleteData}>Don`t Save</button>
      <button onClick={handleSave}>Save</button>
    </>
  );
}

ExitEditorConfirmBox.propTypes = {
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ExitEditorConfirmBox;

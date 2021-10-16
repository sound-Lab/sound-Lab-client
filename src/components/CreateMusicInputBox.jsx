import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './common/Button';
import ErrorMessage from './common/ErrorMessage';

function CreateMusicInputBox({ onSubmit, err }) {
  const [isError, setError] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: '',
  });

  function submitData(ev) {
    ev.preventDefault();

    if (!inputValue.title) {
      setError(err ? err : 'please input value');
      return;
    }

    onSubmit(inputValue);
    setInputValue({ title: '' });
  }

  function handleChange({ target }) {
    const { value } = target;

    setError(true);

    setInputValue({
      ...inputValue,
      title: value,
    });
  }

  return (
    <Wrapper>
      <StyledForm>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="type in here"
          value={inputValue.title}
          onChange={handleChange}
        />
        <Button type="submit" text="submit" onClick={submitData} />
        {isError && <ErrorMessage>{isError}</ErrorMessage>}
      </StyledForm>
    </Wrapper>
  );
}

CreateMusicInputBox.propTypes = {
  onSubmit: PropTypes.func,
  err: PropTypes.string,
};

const Wrapper = styled.div`
  display: flex;
`;

const StyledForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  input {
    font-size: 18px;
    margin: 10px 0px 20px 0px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 300px;
    border: none;
    border-bottom: 1px solid #757575;
  }

  input:focus {
    outline: none;
  }
`;

export default CreateMusicInputBox;

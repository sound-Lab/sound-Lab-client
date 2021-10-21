import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { updateError } from '../modules/mixEditor';

import Button from './common/Button';
import ErrorMessage from './common/ErrorMessage';

function CreateMusicInputBox({ onSubmit }) {
  const [isError, setError] = useState(false);
  const [errMessage, setErrorMessage] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: '',
  });
  const { error } = useSelector((state) => state.mixEditor);
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setError(true);
      return;
    }

    return () => {
      setErrorMessage(null);
      setError(false);
      dispatch(updateError());
    };
  }, [error, isLoading]);

  function submitData(ev) {
    ev.preventDefault();

    if (!inputValue.title) {
      setErrorMessage('please input value');
      setError(true);
      return;
    }

    onSubmit(inputValue);
    setInputValue({ title: '' });
  }

  function handleChange({ target }) {
    const { value } = target;

    setError(true);
    setErrorMessage(null);

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
        {isError && <ErrorMessage>{errMessage}</ErrorMessage>}
      </StyledForm>
    </Wrapper>
  );
}

CreateMusicInputBox.propTypes = {
  onSubmit: PropTypes.func,
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

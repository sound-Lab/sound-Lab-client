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
      setErrorMessage('already exist');
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
      Title
      <Input
        type="text"
        className="label"
        value={inputValue.title}
        onChange={handleChange}
      />
      <StyledButton type="submit" text="submit" onClick={submitData} />
      {isError && <ErrorMessage>{errMessage}</ErrorMessage>}
    </Wrapper>
  );
}

CreateMusicInputBox.propTypes = {
  onSubmit: PropTypes.func,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin: 10px;
  border-bottom: solid 1px #ffffff8f;
  outline: none;
  background: #33393f;
  text-align: center;
  color: white;
  font-size: 23px;
  transition: background 0.3s;

  &:hover {
    background: #464653;
  }

  &:focus {
    background: #393943;
  }
`;

const StyledButton = styled(Button)`
  margin: 0;
`;

export default CreateMusicInputBox;

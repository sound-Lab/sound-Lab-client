import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { addMusic } from '../api/music';

import Button from './common/Button';
import Loading from './common/Loading';
import ErrorMessage from './common/ErrorMessage';

function CreateMusicInputBox({ onSubmit }) {
  const history = useHistory();
  const [inputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: '',
  });

  const { mutate, isLoading, error, isError } = useMutation(addMusic, {
    onSuccess: (musicId) => {
      onSubmit(musicId);
      history.push(`/mixEditor/${musicId}`);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  async function submitData(ev) {
    ev.preventDefault();

    if (!inputValue.title) {
      setInputError('please input value');
      return;
    }

    mutate(inputValue);
    setInputValue({ title: '' });
  }

  function handleChange({ target }) {
    const { value } = target;

    setInputError(true);

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
        {isError && <ErrorMessage>{String(error)}</ErrorMessage>}
        {inputError && <ErrorMessage>{inputError}</ErrorMessage>}
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

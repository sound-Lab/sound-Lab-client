import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { updateTitle } from '../modules/mixEditor';
import ErrorMessage from './common/ErrorMessage';

function TitleInputBox() {
  const { title } = useSelector((state) => state.mixEditor);
  const [titleValue, setTitleValue] = useState(title);
  const [isError, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!title) {
      return;
    }

    setTitleValue(title);
  }, [title]);

  function submitData(ev) {
    ev.preventDefault();

    if (!titleValue) {
      setError('please input title');
      return;
    }

    dispatch(updateTitle(titleValue));
  }

  function handleChange({ target }) {
    const { value } = target;

    setError(false);
    setTitleValue(value);
  }

  return (
    <Wrapper>
      <Input
        type="text"
        min="40"
        max="240"
        className="label"
        value={titleValue}
        onChange={handleChange}
        onBlur={submitData}
      />
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  height: 30px;
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  outline: none;
  border-bottom: solid 0.5px #ffffff67;
  background: #33393f;
  text-align: center;
  color: white;
  font-size: 18px;
  transition: background 0.3s;

  &:hover {
    background: #464653;
  }

  &:focus {
    background: #393943;
  }
`;

export default TitleInputBox;

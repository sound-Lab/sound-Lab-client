import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { updateBpm } from '../modules/mixEditor';
import ErrorMessage from './common/ErrorMessage';

function InputBox() {
  const { bpm } = useSelector((state) => state.mixEditor);
  const [rangeValue, setInputValue] = useState(bpm);
  const [isError, setError] = useState(null);
  const dispatch = useDispatch();

  function submitData(ev) {
    ev.preventDefault();

    if (Number(rangeValue) !== 'number') {
      setError('please input number');
      return;
    }

    dispatch(updateBpm(rangeValue));
    setInputValue(bpm);
  }

  function handleChange({ target }) {
    const { value } = target;

    setError(true);
    setInputValue(value);
  }

  return (
    <Wrapper>
      <Input
        type="text"
        className="label"
        value={rangeValue}
        onChange={handleChange}
        onBlur={submitData}
      />
      bpm
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
  border-bottom: solid 0.5px #dddddd67;
  color: #ffffffab;
`;

const Input = styled.input`
  width: 130px;
  outline: none;
  background: #33393f;
  text-align: center;
  color: white;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: #464653;
  }

  &:focus {
    background: #393943;
  }
`;

export default InputBox;

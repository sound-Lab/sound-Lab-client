import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { updateBpm } from '../modules/mixEditor';
import ErrorMessage from './common/ErrorMessage';

import { ERROR_MESSAGE } from '../constants/errorMessage';

function BpmInputBox() {
  const { bpm } = useSelector((state) => state.mixEditor);
  const [rangeValue, setInputValue] = useState(bpm);
  const [isError, setError] = useState(null);
  const dispatch = useDispatch();

  function submitData(ev) {
    ev.preventDefault();

    if (!rangeValue) {
      setError(ERROR_MESSAGE.INPUT_TITLE);
      return;
    }

    dispatch(updateBpm(rangeValue));
  }

  function handleChange({ target }) {
    const { value } = target;
    const number = parseInt(value);

    setError(false);
    setInputValue(number);
  }

  return (
    <Wrapper>
      <Input
        type="number"
        min="40"
        max="240"
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
  border-bottom: solid 0.5px ${({ theme }) => theme.grayColors.pewter};
  color: ${({ theme }) => theme.grayColors.lightGray};
  transition: border-bottom 0.3s;

  &:hover {
    border-bottom: solid 0.5px ${({ theme }) => theme.grayColors.white};
  }
`;

const Input = styled.input`
  width: 130px;
  outline: none;
  background: ${({ theme }) => theme.grayColors.steel};
  text-align: center;
  color: ${({ theme }) => theme.grayColors.white};
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.grayColors.pewter};
  }

  &:focus {
    background: ${({ theme }) => theme.grayColors.iron};
  }
`;

export default BpmInputBox;

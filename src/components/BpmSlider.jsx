import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { updateBpm } from '../modules/mixEditor';

function BpmSlider() {
  const { bpm } = useSelector((state) => state.mixEditor);
  const [rangeValue, setRangeValue] = useState(bpm);
  const dispatch = useDispatch();

  function changeValue(value) {
    setRangeValue(value);
  }

  function submitValue() {
    dispatch(updateBpm(rangeValue));
  }

  return (
    <Wrapper className="wrapper">
      BPM :
      <input
        type="text"
        className="label"
        value={rangeValue}
        onChange={(e) => changeValue(e.currentTarget.value)}
        onKeyDown={(e) => submitValue(e.currentTarget.value)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;

  .slider {
    -webkit-appearance: none;
    width: 200px;
    height: 50%;
    outline: none;

    &::-webkit-slider-runnable-track {
      display: flex;
      align-items: right;
      width: 200px;
      height: 2px;
      cursor: pointer;
      background: #2153cc;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid #1d1d23;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid #1d1d23;
      cursor: pointer;
    }

    &::-moz-range-track {
      width: 121px;
      height: 2px;
      cursor: pointer;
      background: #2153cc;
      border-radius: 2px;
    }

    &::-ms-track {
      width: 121px;
      height: 2px;
      cursor: pointer;
    }

    &::-ms-fill-lower {
      background-color: #2153cc;
    }

    &::-ms-fill-upper {
      background-color: #2153cc;
    }

    &::-ms-thumb {
      border: 3px solid #000;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
    }
  }

  .label {
    width: 50px;
    height: 20px;
    line-height: 10px;
    outline: none;
    box-shadow: inset 0 0 0 2px #393943;
    background: navy;
    color: white;
    font-size: 14px;
    text-align: center;
    transition: background 0.3s, box-shadow 0.3s;

    &:hover {
      background: #464653;
    }

    &:focus {
      background: #393943;
    }
  }
`;

export default BpmSlider;

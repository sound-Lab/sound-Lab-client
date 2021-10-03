import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../common/Button';

function Header({ title }) {
  return (
    <Wrapper>
      <h2>Title : {title}</h2>
      <MusicPlayer>
        <Button text="▶️" width={40} height={35}></Button>
        <Button text="◼️" width={40} height={35}></Button>
        <Button text="II" width={40} height={35}></Button>
      </MusicPlayer>
      <BpmInput>
        BPM : <input />
      </BpmInput>
      <Button text="start Session" height={45}></Button>
    </Wrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  width: 100%;
  height: 70px;
  background-color: whitesmoke;

  h2 {
    width: 100px;
    margin: 25px 0px 25px 10px;
    vertical-align: middle;
  }
`;

const MusicPlayer = styled.div`
  display: flex;
  align-content: space-around;
`;

const BpmInput = styled.div`
  width: 100%;
  margin: 25px 0px 25px 10px;
`;

export default Header;

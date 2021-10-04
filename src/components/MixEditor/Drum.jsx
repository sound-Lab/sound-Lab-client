import React, { useState } from 'react';
import styled from 'styled-components';

function Drum() {
  const [activeId, setActiveId] = useState(null);
  const drumSoundDummy = [0, 1, 2, 3, 4, 5, 6, 7];

  const beat = [
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
    '_',
  ];

  function setNoteList(ev) {
    ev.preventDefault();

    setActiveId(ev.target.id);
  }

  return (
    <Wrapper>
      <DrumColumns>
        {drumSoundDummy.map((sound, index) => {
          return (
            <DrumColumnBox key={index} id={sound}>
              {sound}
            </DrumColumnBox>
          );
        })}
      </DrumColumns>
      <DrumRows>
        {drumSoundDummy.map((sound, index) => {
          return (
            <div key={index}>
              {beat.map((beat, index) => {
                return (
                  <DrumRowBox
                    key={index}
                    id={`${sound}-${index}`}
                    className={
                      activeId === `${sound}-${index}` ? 'is-active' : null
                    }
                    onClick={setNoteList}
                  />
                );
              })}
            </div>
          );
        })}
      </DrumRows>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-content: space-between;
  margin: 20px;
  background-color: darkblue;
`;

const DrumColumns = styled.ul`
  display: grid;
  width: 10%;
  margin-right: 10px;
`;

const DrumColumnBox = styled.div`
  width: 100%;
  background-color: white;
  border: solid 0.01em;
  border-color: ${({ theme }) => theme.MainColors.navyBlue};
`;

const DrumRows = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  div {
    display: flex;
    flex-direction: row;
    border: solid 0.01em;
    border-color: ${({ theme }) => theme.MainColors.navyBlue};
    width: 100%;
    height: 100%;
  }
`;

const DrumRowBox = styled.div`
  background-color: white;
`;

export default Drum;

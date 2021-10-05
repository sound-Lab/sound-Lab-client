import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getMusicData } from '../api/music';

import MixEditorHeader from '../components/MixEditor/Header';
import AddTrackContainer from '../components/MixEditor/AddTrackContainer';
import SheetMusic from '../components/MixEditor/SheetMusic';
import Drum from '../components/MixEditor/Drum';

import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

function MixEditor() {
  const [musicTitle, setMusicTitle] = useState(null);
  const [drum, setDrum] = useState([]);
  const { musicId } = useParams();

  useEffect(() => {
    mutate(musicId);
  }, []);

  const { mutate, isLoading, error, isError } = useMutation(getMusicData, {
    onSuccess: (result) => {
      setMusicTitle(result.title);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={String(error.message)} />;
  }

  return (
    <>
      <MixEditorHeader title={musicTitle} />
      <Wrapper>
        <AddTrackContainer setDrum={setDrum} />
        <SheetMusic />
        <Dummy />
        <Drum data={drum} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template: 45% 55% / 20% 80%;
  height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.MainColors.navyBlue};
`;

const Dummy = styled.div`
  height: 100%;
  background-color: whitesmoke;
`;

export default MixEditor;

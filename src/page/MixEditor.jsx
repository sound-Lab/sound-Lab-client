import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getMusicData } from '../api/music';

import MixEditorHeader from '../components/MixEditor/Header';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

function MixEditor() {
  const [musicTitle, setMusicTitle] = useState(null);
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
    <Wrapper>
      <MixEditorHeader title={musicTitle} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.MainColors.navyBlue};
`;

export default MixEditor;

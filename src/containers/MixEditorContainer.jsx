import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getMusicData } from '../modules/mixEditor';

import MixEditorHeader from '../components/MixEditorHeader';
import TrackList from '../components/TrackList';
import Drum from '../components/Drum';
import Loading from '../components/common/Loading';

function MixEditorContainer() {
  const { title, currentInstrument } = useSelector(
    (state) => state.mixEditorReducer,
  );
  const { isLoading } = useSelector((state) => state.loading);
  const { musicId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMusicData(musicId));
  }, [musicId]);

  return (
    <>
      <MixEditorHeader title={title} />
      <MixEditorWrapper>
        <TrackWrapper>
          <TrackList />
        </TrackWrapper>
        <ToolWrapper>{currentInstrument === 'Drum' && <Drum />}</ToolWrapper>
        {isLoading && <Loading />}
      </MixEditorWrapper>
    </>
  );
}

const MixEditorWrapper = styled.section`
  height: calc(100vh - 140px);
  display: grid;
  grid-template-rows: 50% 50%;
`;

const TrackWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  background-color: ${({ theme }) => theme.MainColors.navyBlue};
`;

const ToolWrapper = styled.div`
  height: 100%;
  display: grid;
  background-color: green;
`;

export default MixEditorContainer;

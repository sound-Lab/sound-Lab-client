import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getMusicData } from '../modules/mixEditor';

import MixEditorHeader from '../components/MixEditorHeader';
import TrackList from '../components/TrackList';
import Sequencer from '../components/Sequencer';
import SheetMusic from '../components/SheetMusic';
import Loading from '../components/common/Loading';

function MixEditorContainer() {
  const { title, tracks } = useSelector((state) => state.mixEditor);
  const { isLoading } = useSelector((state) => state.loading);
  const [isSampleLoading, setIsSampleLoading] = useState(false);
  const { musicId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMusicData(musicId));
  }, [musicId]);

  useEffect(() => {
    if (!tracks.length) {
      return;
    }

    setIsSampleLoading(true);
  }, [tracks.length]);

  return (
    <>
      <MixEditorHeader title={title} />
      <MixEditorWrapper>
        <TrackWrapper>
          <TrackList />
          {isSampleLoading && <SheetMusic />}
        </TrackWrapper>
        <ToolWrapper>{isSampleLoading && <Sequencer />}</ToolWrapper>
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
  display: flex;
  background-color: ${({ theme }) => theme.MainColors.navyBlue};
`;

const ToolWrapper = styled.div`
  height: 100%;
  display: grid;
  background-color: green;
`;

export default MixEditorContainer;

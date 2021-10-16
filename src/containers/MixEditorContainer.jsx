import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as Tone from 'tone';

import {
  getMusicData,
  setTrackSampler,
  setCurrentTrack,
} from '../modules/mixEditor';
import { getInstrumentData } from '../modules/instrument';
import { toneSampler } from '../lib/toneSampler';

import MixEditorHeader from '../components/MixEditorHeader';
import TrackList from '../components/TrackList';
import StepSequencer from '../components/StepSequencer';
import SheetMusic from '../components/SheetMusic';
import Loading from '../components/common/Loading';

function MixEditorContainer() {
  const [isSampleLoading, setIsSampleLoading] = useState(false);
  const { tracks, currentTrack } = useSelector((state) => state.mixEditor);
  const { instrument } = useSelector((state) => state.instrument);
  const { isLoading } = useSelector((state) => state.loading);
  const { musicId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMusicData(musicId));
  }, [musicId]);

  useEffect(() => {
    if (!tracks.length) {
      return;
    }

    if (currentTrack === null) {
      tracks.map((track) => dispatch(getInstrumentData(track.name)));
    }

    setIsSampleLoading(true);

    return () => {
      setIsSampleLoading(false);
    };
  }, [tracks]);

  useEffect(async () => {
    if (Object.keys(instrument).length === 0) {
      return;
    }

    if (!tracks.length) {
      return;
    }

    const sampler = tracks.map((track, index) => {
      return toneSampler(instrument[track.name]);
    });

    try {
      await Tone.loaded();
    } catch (error) {
      console.log(error);
    }

    dispatch(setTrackSampler({ sampler }));
    dispatch(setCurrentTrack(tracks.length - 1));
  }, [isLoading]);

  return (
    <>
      <MixEditorHeader />
      <MixEditorWrapper>
        <TrackWrapper>
          <TrackList />
          <SheetMusic />
        </TrackWrapper>
        <ToolWrapper>
          {isSampleLoading && currentTrack !== null && <StepSequencer />}
        </ToolWrapper>
        {isLoading && <Loading />}
      </MixEditorWrapper>
    </>
  );
}

const MixEditorWrapper = styled.section`
  height: 100vh;
  display: grid;
  grid-template-rows: 40% 60%;
`;

const TrackWrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

const ToolWrapper = styled.div`
  height: 100%;
  display: grid;
  background-color: #33393e;
`;

export default MixEditorContainer;

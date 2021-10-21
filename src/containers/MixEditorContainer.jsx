import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
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
import Error from '../components/common/Error';

function MixEditorContainer() {
  const [isSampleLoading, setIsSampleLoading] = useState(false);
  const { tracks, currentTrack, sampler } = useSelector(
    (state) => state.mixEditor,
  );
  const { instrument } = useSelector((state) => state.instrument);
  const { isLoading } = useSelector((state) => state.loading);
  const { musicId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  window.history.pushState(null, '', location.href);

  window.onpopstate = function () {
    history.go(1);
  };

  useEffect(() => {
    dispatch(getMusicData(musicId));
    dispatch(getInstrumentData());
  }, []);

  useEffect(() => {
    if (Object.keys(sampler).length) {
      setIsSampleLoading(true);
    }
  }, []);

  useEffect(async () => {
    if (Object.keys(sampler).length !== 0) {
      return;
    }

    if (!instrument.length) {
      return;
    }

    const samplerList = toneSampler(instrument);

    try {
      await Tone.loaded();
    } catch (error) {
      <Error error={error} />;
    }

    dispatch(setTrackSampler({ samplerList }));
    setIsSampleLoading(true);
  }, [instrument.length, isLoading]);

  useEffect(() => {
    if (!tracks.length) {
      return;
    }

    if (Object.keys(sampler).length !== 0) {
      return;
    }

    setIsSampleLoading(true);
    dispatch(setCurrentTrack(0));
  }, [sampler, isLoading]);

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
        {!isSampleLoading && <Loading />}
      </MixEditorWrapper>
    </>
  );
}

const MixEditorWrapper = styled.section`
  width: 100vw;
  height: calc(100vh - 100px);
`;

const TrackWrapper = styled.article`
  width: 100vw;
  height: calc(100vh - 60vh);
  display: flex;
  background-color: #1b1d21;
`;

const ToolWrapper = styled.article`
  width: 100%;
  height: calc(100vh - 40vh - 100px);
  background-color: #33393e;
`;

export default MixEditorContainer;

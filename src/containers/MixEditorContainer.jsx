import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as Tone from 'tone';

import { getMusicData } from '../modules/mixEditor';
import { getInstrumentData, loadSoundData } from '../modules/instrument';

import MixEditorHeader from '../components/MixEditorHeader';
import TrackList from '../components/TrackList';
import Sequencer from '../components/Sequencer';
import Loading from '../components/common/Loading';

import { toneSampler } from '../lib/toneSampler';

function MixEditorContainer() {
  const { title, currentInstrument } = useSelector((state) => state.mixEditor);
  const { instrument } = useSelector((state) => state.instrument);
  const { isLoading } = useSelector((state) => state.loading);
  const [isSamplerloaded, setIsSamplerLoaded] = useState(false);
  const { musicId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMusicData(musicId));
  }, [musicId]);

  useEffect(() => {
    if (!currentInstrument) {
      return;
    }

    dispatch(getInstrumentData(currentInstrument));
  }, [currentInstrument]);

  useEffect(async () => {
    if (isLoading === null && isLoading) {
      return;
    }

    if (!currentInstrument) {
      return;
    }

    setIsSamplerLoaded(false);

    try {
      const loadedInstrument = {};
      const sampler = toneSampler(instrument[currentInstrument]);

      loadedInstrument[currentInstrument] = sampler;

      await Tone.loaded().then(() => {
        dispatch(loadSoundData(loadedInstrument));
      });
    } catch (err) {
      console.log(err);
    }

    return setIsSamplerLoaded((bool) => !bool);
  }, [currentInstrument, isLoading]);

  return (
    <>
      <MixEditorHeader title={title} />
      <MixEditorWrapper>
        <TrackWrapper>
          <TrackList />
        </TrackWrapper>
        <ToolWrapper>
          {!isLoading && isSamplerloaded && (
            <Sequencer instrument={instrument[currentInstrument]} />
          )}
        </ToolWrapper>
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

export default React.memo(MixEditorContainer);

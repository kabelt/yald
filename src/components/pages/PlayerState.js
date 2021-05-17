import React, { useReducer } from 'react';
import playerContext from './PlayerContext';
import playerReducer from './PlayerReducer';

import {
  TOGGLE_PLAYING
} from './Types';

const PlayerState = props => {
  const initialState = {
    playing: false,
    audio: null
  }
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Set playing state
  const togglePlaying = () => dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true })


  return <playerContext.Provider
    value={{
      playing: state.playing,
      audio: state.audio,
      togglePlaying,
    }}>

    {props.children}

  </playerContext.Provider>
}

export default PlayerState;


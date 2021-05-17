import React, { useState, useEffect, useRef, useContext, useReducer } from 'react'
import { useStateValue } from "./StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./SinglePlayer.css";
import { Grid, Slider } from "@material-ui/core";
import PlayerState from './PlayerState'

import playerReducer from './PlayerReducer';

function Player(props) {


    const initialState = {
        playing: false,
        audio: null
      }

    const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const [audio] = useState(new Audio(`https://ipfs.infura.io/ipfs/${props.track}`));
    const [playing, setPlaying] = useState(false);
    const [statevolum, setStateVolum] = useState(0.5);
    const [dur, setDur] = useState(0)
    console.log(audio.duration)
    const [currentTime, setCurrentTime] = useState(50)
    const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~(s) }
    const toggleAudio = () => audio.paused ? audio.play() : audio.pause();
    const togglePlaying = () => dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true })

    const toggle = () => setPlaying(!playing);

    const handleVolume = (q) => {
        setStateVolum(q);
        audio.volume = q;
      }

    const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.currentTime = compute;
    }



    useEffect(() => {
        audio.volume = statevolum;
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );


  return (
    <PlayerState>
        <div className="footer">
        <audio

        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        ref={audio}
        type="audio/mpeg"
        preload='true'
        />

        <div className="progressb">
            <span className="currentT">{fmtMSS(currentTime)}</span>
            <input
                onChange={handleProgress}
                value={dur ? (currentTime * 100) / dur : 0}
                type="range" name="progresBar" id="prgbar" />
            <span className="totalT">{fmtMSS(dur)}</span>
        </div>

        <div className="footer__left">
        </div>
        <div className="footer__center">

            {!audio.paused ? (
            <PauseCircleOutlineIcon
                onClick={() => { togglePlaying(); toggleAudio(); }}
                fontSize="large"
                className="footer__icon"
            />
            ) : (
            <PlayCircleOutlineIcon
                onClick={() => { togglePlaying(); toggleAudio(); }}
                fontSize="large"
                className="footer__icon"
            />
            )}
        </div>
        <div className="footer__right">
            <Grid container spacing={1}>
            <Grid item>
            </Grid>
            <Grid item xs>
                <input value={Math.round(statevolum * 100)} type="range" name="volBar" id="volBar" onChange={(e) => handleVolume(e.target.value / 100)} />
            </Grid>
            </Grid>
        </div>
        </div>
    </PlayerState>
  );
}

export default Player;

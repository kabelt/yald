import React from "react";
import { ReactComponent as Play } from "../../assets/play.svg";
import { ReactComponent as Pause } from "../../assets/pause.svg";
import { ReactComponent as Next } from "../../assets/next.svg";
import { ReactComponent as Prev } from "../../assets/prev.svg";
import { useHistory } from "react-router-dom";

function AudioControls(props) {

    const history = useHistory();

    const prevSong = () =>{
        let prev_id = (+props.id - +1) % props.musiccount ? (+props.id - +1) % props.musiccount : props.musiccount
        history.push({
        state: {id: prev_id},
        pathname: `/single`
      });
    }

    const nextSong = () =>{
        let next_id = (+props.id + +1) % props.musiccount ? (+props.id + +1) % props.musiccount : props.musiccount
        history.push({
        state: {id: next_id},
        pathname: `/single`
      });
    }

  return (
        <div className="audio-controls">
            <button
            type="button"
            className="prev"
            aria-label="Previous"
            onClick={prevSong}
            >
            <Prev />
            </button>
            {props.isPlaying ? (
            <button
                type="button"
                className="pause"
                onClick={() => props.onPlayPauseClick(false)}
                aria-label="Pause"
            >
                <Pause />
            </button>
            ) : (
            <button
                type="button"
                className="play"
                onClick={() => props.onPlayPauseClick(true)}
                aria-label="Play"
            >
                <Play />
            </button>
            )}
            <button
            type="button"
            className="next"
            aria-label="Next"
            onClick={nextSong}
            >
            <Next />
            </button>
        </div>
    );
}

export default AudioControls;
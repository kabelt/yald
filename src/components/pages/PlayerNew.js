import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "./PlayerNew.css";

/*
 * Credit:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */

const AudioPlayer = (props) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const title = props.title;
    const artist = props.author_name;
    const color = "#000000";
    const image = props.artwork;
    const audioSrc = `https://ipfs.infura.io/ipfs/${props.track}`;


    // Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    // Destructure for conciseness
    const { duration } = audioRef.current;

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
        -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;

    const startTimer = () => {
    // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
        if (audioRef.current.ended) {
        } else {
            setTrackProgress(audioRef.current.currentTime);
        }
        }, [1000]);
    };

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
        setIsPlaying(true);
        }
        startTimer();
    };

    useEffect(() => {
        if (isPlaying) {
        audioRef.current.play();
        startTimer();
        } else {
        audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
        audioRef.current.play();
        setIsPlaying(true);
        startTimer();
        } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
        }
    }, [props.id]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="audio-player">
        <div className="track-info">
            <AudioControls

            id = {props.id}
            musiccount = {props.musiccount}
            isPlaying={isPlaying}
            onPlayPauseClick={setIsPlaying}
            />
            <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
            />
        </div>
        {/* <Backdrop
            trackIndex={trackIndex}
            activeColor={color}
            isPlaying={isPlaying}
        /> */}
        </div>
    );
    };

    export default AudioPlayer;

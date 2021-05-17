import React from 'react';
import '../App.css';
// import { Button } from './Button';
import { Start_Button } from './Button';
import './HeroSection.css';
import {animateScroll as scroll} from 'react-scroll';
import Navbar from './Navbar';

const toggleScroll = () => {
    scroll.scrollTo(707)
}

function HeroSection() {
  return (
    <div className='hero-container'>
        <Navbar />
        <video src='/videos/dj.mp4' autoPlay loop muted />
        <div className='hero-subcontainer'>
            <h1>YALD</h1>
            <h2>Music Royalty Reinvented</h2>
            <div className='hero-btns'>
                <Start_Button
                onClick={toggleScroll}
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--large'
                >
                    GET STARTED
                </Start_Button>
            </div>
      </div>
    </div>
  );
}

export default HeroSection;

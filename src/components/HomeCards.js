import React from 'react';
import './HomeCards.css';
import HomeCardItem from './HomeCardItem';

function Cards() {
  return (
    <div className='home__cards'>
      <h1 >How can we help?</h1>
      <div className='home__cards__container'>
        <div className='home__cards__wrapper'>
          <ul className='home__cards__items'>
            <HomeCardItem
              src='images/artist2.jpg'
              text='Get your work copyrighted'
              label='Artist'
              path='/registration'
            />
            <HomeCardItem
              src='images/concert.jpg'
              text='Obtain copyright permission'
              label='Entrepreneur'
              path='/explore'
            />
            <HomeCardItem
              src='images/fans.jpg'
              text='Support your beloved artist'
              label='Fans'
            />
            <HomeCardItem
              src='images/law.jpg'
              text='Check for infringement'
              label='Law Enforcement'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
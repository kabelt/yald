import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCards.css'

function HomeCardItem(props) {
  return (
    <>
        <Link className='home__cards__item__link' to={props.path}>
          <figure className='home__cards__item__pic-wrap' data-category={props.label}>
            <img
              className='home__cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='home__cards__item__info'>
            <h5 className='home__cards__item__text'>{props.text}</h5>
          </div>
        </Link>
    </>
  );
}

export default HomeCardItem;

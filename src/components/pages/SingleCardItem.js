import React from 'react';
import { Link } from 'react-router-dom';
import Player from './SinglePlayer'
import PlayerNew from './PlayerNew'

function SingleCardItem(props) {
  return (
    <>
        <figure className='cards__item__link'data-category={props.label}>
          <figure className='cards__item__pic-wrap' data-category={props.author_name}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.artwork}
            />
          </figure>

        <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.description}</h5>
        </div>
        <PlayerNew
            id = {props.id}
            track={props.track}
            musiccount = {props.musiccount}/>
        </figure>
    </>
  );
}

export default SingleCardItem;
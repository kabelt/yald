import React from 'react';
import { Link } from 'react-router-dom';

function ExploreCardItem(props) {
  return (
    <>
        <Link className='cards__item__link'
        to={{
            pathname: '/single',
            state: {
                    id: props.id,
                    title: props.title,
                    author_name: props.author_name,
                    track: props.track,
                    artwork: props.artwork,
                    description: props.description,
                    cir_supply: props.cir_supply
            }
        }}>
          <figure className='cards__item__pic-wrap' data-category={props.author_name}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.artwork}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.title}</h5>
          </div>
        </Link>
    </>
  );
}

export default ExploreCardItem;

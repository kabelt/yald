import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./ProfileTokenCardItem.css"
import Row from 'react-bootstrap/Row'
import './ProfileTokenCardItem.css'

function ProfileTokenCardItem(props) {
  return (
    <>
        <Link className={"token__item__link__" +
        (props.tokenamount <= 3 ? "premium" : "") +
        (props.tokenamount > 3 && props.tokenamount <= 10 ? "royal" : "") +
        (props.tokenamount > 10 ? "ultimate" : "")
        }

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
          <figure className='token__item__pic-wrap' data-category={props.author_name}>
            <img
              className='token__item__img'
              alt='Travel Image'
              src={props.artwork}
            />
          </figure>
          <Row className='token__item__info'>
            <h5 className='token__item__text'>{props.title}</h5>
            <h5 className='token__item__price'>{props.tokenamount}</h5>
          </Row>
        </Link>
    </>
  );
}

export default ProfileTokenCardItem;


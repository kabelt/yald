import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import "./ExploreForm.css"

function get_nextprice(cir_supply){
    let price = (((Number(cir_supply)+1)**3)/1000/3) - ((Number(cir_supply)**3)/1000/3)
    return (Math.round((price) * 1e5) / 1e5)
}

function ExploreCardItem(props) {
  return (
    <>
        <Link className='cards__item__link'
        to={{
            pathname: '/single',
            state: {
                    id: props.id,
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
            <Row className="title_price">
                <h5 className='explore__cards__text'>{props.title}</h5>
                <h5 className='explore__cards__price'>Ξ {get_nextprice(props.cir_supply)}</h5>
            </Row>
          </div>
        </Link>
    </>
  );
}

export default ExploreCardItem;

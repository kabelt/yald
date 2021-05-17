import React from 'react';
import './ExploreForm.css'
import ExploreCardItem from './ExploreCardItem'
import { CardColumns, CardDeck } from 'react-bootstrap';

function ExploreForm (props) {

    let imageDescription;

    return (
        <div>
        <div className='cards'>
        <h1 >Check out these awesome works</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
                { props.music.map((single, key) => {
                        return(
                            <ExploreCardItem
                            id={key+1}
                            title={single.title}
                            author_name={single.author_name}
                            track={single.track}
                            artwork={`https://ipfs.infura.io/ipfs/${single.artwork}`}
                            description={single.description}
                            cir_supply={single.cir_supply}
                            />
                        )
                    })}
            </ul>

          </div>
        </div>
      </div>
        </div>
    );
}

export default ExploreForm;
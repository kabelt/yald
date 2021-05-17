import React from 'react';
import './ExploreForm.css'
import ProfileOwnedCardItem from './ProfileOwnedCardItem'
import ProfileTokenCardItem from './ProfileTokenCardItem'
import { CardColumns, CardDeck } from 'react-bootstrap';

function ProfileForm (props) {

    let imageDescription;

    return (
        <div>
            <div className='cards'>
                {props.madeMusicCount > 1 ? (<h1>My works</h1>) : (<h1>My work</h1>)}
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            { props.madeMusic.map((single, key) => {
                                    return(
                                        <ProfileOwnedCardItem
                                        id={single.id}
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
            <div className='cards'>
                {props.ownedMusicCount > 1 ? (<h1>My tokens</h1>) : (<h1>My token</h1>)}
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            { props.ownedMusic.map((single, key) => {
                                    return(
                                        <ProfileTokenCardItem
                                        id={single.id}
                                        title={single.title}
                                        author_name={single.author_name}
                                        track={single.track}
                                        artwork={`https://ipfs.infura.io/ipfs/${single.artwork}`}
                                        description={single.description}
                                        tokenamount={single.tokenAmount}
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

export default ProfileForm;
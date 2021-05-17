import React, { useState, useEffect, useCallback } from 'react';
import Yald from '../../abis/Yald.json'
import { Link, useLocation } from 'react-router-dom';
import SingleCardItem from './SingleCardItem';
import './Single.css';
import Web3 from 'web3';
import Tilt from 'react-tilt';
import Row from 'react-bootstrap/Row';
import Modal from './Modal';
import { GlobalStyle } from './globalStyle';
import Navbar from '../Navbar';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      window.alert("Non-Ethereum browser detected. Try MetaMask.");
    }
  }

function Single (){
    let data = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [isbuy, setIsbuy] = useState(true);
    const [single, setSingle] = useState([]);
    const [web3, setWeb3] = useState(undefined);
    const [yald, setYald] = useState([]);
    const [tk, settk] = useState(undefined);
    const [prevsong, setPrevsong] = useState(undefined);
    const [musiccount, setMusicCount] = useState(0);
    const openModal = (mode) => {
        setShowModal(prev => !prev)
        if (mode) {
            setIsbuy(true)
        } else {
            setIsbuy(false)
        }
    };

    async function loadBlockchainData(){
        const web3 = window.web3
        setWeb3(web3)
        //load blockchain data
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = Yald.networks[networkId]
        if(networkData) {
            const yald = new web3.eth.Contract(Yald.abi, networkData.address)
            setYald(yald)
            // Load images
            const _single = await yald.methods.music(data.state.id).call()
            const _musiccount = await yald.methods.musicCount().call()
            setSingle(_single)
            setMusicCount(_musiccount)

        } else {
            window.alert('Yald contract not deployed to detected network.')
        }
    }

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, [data.state.id]);

    if (!single.track) {
        return <div></div>
    } else {
    return(
        <div>
        <Navbar/>
        <div className='single'>

            <h1>{single.title}</h1>

            <ul className='single__cards__items'>
            <Tilt
                style={{ background: '#000', borderRadius: '8px' }}
                options={{ scale: 1.01, max: 10, glare: true, 'max-glare': 1, speed: 1000 }}
                >
                            <SingleCardItem
                            id={single.id}
                            title={single.title}
                            author_name={single.author_name}
                            track={single.track}
                            artwork={`https://ipfs.infura.io/ipfs/${single.artwork}`}
                            description={single.description}
                            musiccount = {musiccount}
                            />
            </Tilt>
            <Row className="buysell-btn">
            <button className='buy-btn'
                    name='buy_btn'
                    onClick={(mode) => {
                            openModal(1)
                        }}
            >
            BUY
            </button>
            <button className='sell-btn'
                    name='sell_btn'
                    onClick={(mode) => {
                        openModal(0)
                    }}
            >
            SELL
            </button>
            </Row>
            </ul>
            <Modal
                id = {data.state.id}
                showModal = {showModal}
                setShowModal = {setShowModal}
                cur_supply = {single.cir_supply}
                isbuy = {isbuy}
            />
        </div>
        </div>
    );}
}
export default Single;
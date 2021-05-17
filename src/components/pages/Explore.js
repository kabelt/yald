import Yald from '../../abis/Yald.json'
import React, { useState, useEffect, useCallback } from 'react';
import ExploreForm from './ExploreForm'
import Web3 from 'web3';
import '../../App.css';
import Navbar from '../Navbar';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      window.alert("Non-Ethereum browser detected. Try MetaMask.");
    }
  }

function Explore() {

    const [web3, setWeb3] = useState(undefined);
    const [account, setAccount] = useState([]);
    const [yald, setYald] = useState([]);
    const [musicCount, setMusicCount] = useState(0);
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buffer, setBuffer] = useState([undefined]);

    async function loadBlockchainData(){
        const web3 = window.web3
        setWeb3(web3)
        //load blockchain data
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        // Network ID
        const networkId = await web3.eth.net.getId()
        // console.log(accounts[0])
        const networkData = Yald.networks[networkId]
        // console.log(networkData)
        if(networkData) {
            const yald = new web3.eth.Contract(Yald.abi, networkData.address)
            setYald(yald)
            const musicCount = await yald.methods.musicCount().call()
            setMusicCount(musicCount)
            // Load images
            for (var i = 1; i <= musicCount; i++) {
                const single = await yald.methods.music(i).call()
                setMusic(music => [...music, single])
            }
            setLoading(false)
        } else {
            window.alert('Yald contract not deployed to detected network.')
        }
    }

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
      setIsSubmitted(true);
      window.alert("Almost there!")
    }

    return (
        <div>
            <Navbar/>
            <ExploreForm
                music={music}
                musicCount = {musicCount}
            />
        </div>
    );
}

export default Explore;
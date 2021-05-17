import Yald from '../../abis/Yald.json'
import React, { useState, useEffect, useCallbak } from 'react';
import Identicon from 'identicon.js';
import Loader from '../../Loader'
import RegistrationForm from './RegistrationForm'
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

function Registration() {

    const [web3, setWeb3] = useState(undefined);
    const [account, setAccount] = useState([]);
    const [yald, setYald] = useState([]);
    const [musicCount, setMusicCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [trackBuffer, setTrackBuffer] = useState([undefined]);
    const [artworkBuffer, setArtworkBuffer] = useState([undefined]);

    async function loadBlockchainData(){
        const web3 = window.web3
        setWeb3(web3)
        //load blockchain data
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = Yald.networks[networkId]
        if(networkData) {
            const yald = new web3.eth.Contract(Yald.abi, networkData.address)
            setYald(yald)
            const musicCount = await yald.methods.musicCount().call()
            setMusicCount(musicCount)
            setLoading(false)
        } else {
            window.alert('Yald contract not deployed to detected network.')
        }
    }

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

    const captureTrack = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setTrackBuffer(Buffer(reader.result))
        }
    }

    const captureArtwork = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setArtworkBuffer(Buffer(reader.result))
        }
    }

    const uploadSingle = (title, author_name, description, contributors) => {
    console.log("Submitting file to ipfs...")
    //adding file to the IPFS
    ipfs.add(trackBuffer, (error_track, trackresult) => {
        if(error_track) {
            return
        }
        ipfs.add(artworkBuffer, (error_artwork, artworkresult) => {
            if(error_artwork) {
                return
            }
            yald.methods.uploadSingle(title, author_name, trackresult[0].hash, artworkresult[0].hash, description, contributors[0], contributors[1], contributors[2]).send({ from: account }).on('transactionHash', (hash) => {})
        })
    })
    }

    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
      setIsSubmitted(true);
      window.alert("Your work has been successfully copyrighted!")
    }

    if (loading) {
        return <Loader />;
      } else {
        return (
            <div>
            <Navbar/>

                <RegistrationForm
                    submitForm={submitForm}
                    captureTrack={captureTrack}
                    captureArtwork={captureArtwork}
                    uploadSingle={uploadSingle}
                />
            </div>
        );
      }
}

export default Registration;
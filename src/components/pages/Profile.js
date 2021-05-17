import Yald from '../../abis/Yald.json'
import React, { useState, useEffect, useCallback } from 'react';
import Identicon from 'identicon.js';
import Loader from '../../Loader'
import ProfileForm from './ProfileForm'
import Web3 from 'web3';
import '../../App.css';
import Navbar from '../Navbar';

async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      window.alert("Non-Ethereum browser detected. Try MetaMask.");
    }
  }

function Profile() {

    const [web3, setWeb3] = useState(undefined);
    const [account, setAccount] = useState([]);
    const [yald, setYald] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buffer, setBuffer] = useState([undefined]);
    const [madeMusicCount, setMadeMusicCount] = useState(0);
    const [madeMusic, setMadeMusic] = useState([]);
    const [ownedMusicCount, setOwnedMusicCount] = useState(0);
    const [ownedMusic, setOwnedMusic] = useState([]);

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
            let mmc = 0
            let omc = 0
            // Load songs
            let token = []
            for (var i = 1; i <= musicCount; i++) {
                const single = await yald.methods.music(i).call()
                if (single.author_address == accounts[0]){
                    setMadeMusic(madeMusic => [...madeMusic, single])
                    mmc++
                }
                const amount = await yald.methods.ownership(accounts[0], single.id).call()
                if (Number(amount) >= 1){
                    single.tokenAmount = Number(amount)
                    token = [...token, single]
                    omc++
                }
            }
            setOwnedMusic(token.sort((a,b) => (a.tokenAmount < b.tokenAmount) ? 1 : -1))
            setMadeMusicCount(mmc)
            setOwnedMusicCount(omc)
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
      window.alert("YOO!")
    }

        return (
            <div>
                <Navbar/>
                <ProfileForm
                    madeMusic = {madeMusic}
                    madeMusicCount = {madeMusicCount}
                    ownedMusic = {ownedMusic}
                    ownedMusicCount = {ownedMusicCount}
                    madeMusicCount = {madeMusicCount}
                    ownedMusicCount = {ownedMusicCount}
                />
            </div>
        );
      }

export default Profile;
import './Navbar.css';
import Web3 from 'web3';
import { Button } from './Button';
import Yald from '../abis/Yald.json'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Navbar() {

    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState(0);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [cbal, setCbal] = useState(0);
    const [yald, setYald] = useState([]);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

  useEffect(() => {
    showButton();

    const init = async () => {
        try {
            if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            }
            else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            }
            else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            }
            const web3 = window.web3
            setWeb3(web3)
            const accounts = await web3.eth.getAccounts()
            setAccounts(accounts)
            const networkId = await web3.eth.net.getId()
            const networkData = Yald.networks[networkId]
            if(networkData) {
                const yald = new web3.eth.Contract(Yald.abi, networkData.address)
                setYald(yald)
                const cbal = await yald.methods.contract_bal().call()
                if (!cbal.toString().localeCompare("0")) {
                    console.log(cbal.toString())
                    setCbal(cbal)
                } else {
                    console.log(cbal.toString())
                    setCbal(Math.round(window.web3.utils.fromWei(cbal.toString()) * 1e2) / 1e2)
                }
            } else {
                window.alert('Yald contract not deployed to detected network.')
            }
            if(typeof accounts[0]!== 'undefined'){
                const _balance = await web3.eth.getBalance(accounts[0])
                setBalance(Math.round(web3.utils.fromWei(_balance) * 1e2) / 1e2)
            } else {
                window.alert('Please login with MetaMask')
            }
        }
        catch (error) {
            alert (error);
        }
    }
    init()
  }, []);
    window.addEventListener('resize', showButton);
  if (!accounts[0]){
    return <div></div>
  } else {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <i class="fas fa-wave-square fa-flip-horizontal"></i>
          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
              <Link
                to=''
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {balance} ETH
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                {balance}
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>{accounts[0].substring(0,6)}...</Button>}
        </div>
      </nav>
    </>
  );}
}

export default Navbar;

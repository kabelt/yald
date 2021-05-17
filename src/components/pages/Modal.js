import React, {Component, useState, useEffect} from 'react';
import Web3 from 'web3';
import Yald from '../../abis/Yald.json'
import styled from 'styled-components';
import { MdClose } from "react-icons/md";
import NumericInput from 'react-numeric-input';
import {Background, ModalWrapper, ModalImg, ModalContent, CloseModalButton, ModalRow_first, ModalRow_rest} from './Modal-styled'
import Row from 'react-bootstrap/Row';
import './Modal.css';

function Modal (props) {

    const [web3, setWeb3] = useState(undefined);
    const [account, setAccount] = useState([]);
    const [balance, setBalance] = useState(0);
    const [yald, setYald] = useState([]);
    const [contract_bal, setContract_bal] = useState(0);
    const [balAmount, setBalAmount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);
    const [buyFee, setBuyFee] = useState(0);
    const [buyTotal, setBuyTotal] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const [sellFee, setSellFee] = useState(0);
    const [sellTotal, setSellTotal] = useState(0);

    useEffect(() => {
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
            setAccount(accounts[0])

            if (typeof accounts[0]!== 'undefined') {
                const _balance = await web3.eth.getBalance(accounts[0])
                setBalance(web3.utils.fromWei(_balance))
            } else {
                window.alert('Please login with MetaMask')
            }

            // Network ID
            const networkId = await web3.eth.net.getId()
            const networkData = Yald.networks[networkId]
            if(networkData) {
            const yald = new web3.eth.Contract(Yald.abi, networkData.address)
            setYald(yald)
            const amount = await yald.methods.ownership(accounts[0], props.id).call()
            setBalAmount(amount)
            } else {
                window.alert('Yald contract not deployed to detected network.')
            }
        }
    catch (error) {
        alert ('Failed to load web3, accounts, or contract. Check console for details.');
    }
    }
    init()
  }, []);

    const buy_price = (cur_supply, amount) => {
        return ((((Number(cur_supply)+amount)**3)/1000/3) - ((Number(cur_supply)**3)/1000/3))
    }

    const buy_total = (cur_supply, amount) => {
        return ((((Number(cur_supply)+amount)**3)/1000/3) - ((Number(cur_supply)**3)/1000/3)) * 100 / 85
    }

    const sell_price = (cur_supply, amount) => {
        return (((Number(cur_supply)**3)/1000/3) - (((Number(cur_supply)-amount)**3)/1000/3))
    }

    const sell_total = (cur_supply, amount) => {
        return (((Number(cur_supply)**3)/1000/3) - (((Number(cur_supply)-amount)**3)/1000/3)) * .85
    }


    const buyToken = (id, amount) => {
        let total = buy_total(props.cur_supply, amount)
        let weitotal = window.web3.utils.toWei(total.toString(), 'Ether')
        yald.methods.buyToken(id, amount).send({ from: account, value: weitotal }).on('transactionHash', (hash) => {
            window.location.reload()
            })
        setAmount(0)
    }

    const sellToken = (id, amount) => {
        let total = sell_price(props.cur_supply, amount)
        let weitotal = window.web3.utils.toWei(total.toString(), 'Ether')
        yald.methods.sellToken(id, amount, weitotal).send({from: account}).on('transactionHash', (hash) => {
            window.location.reload()
            })
        setAmount(0)

    }

    const handle_AmountChange = (event, isbuy) => {
        setAmount(event)
        if (isbuy) {
            setBuyPrice(buy_price(props.cur_supply, event))
            setBuyTotal(buy_total(props.cur_supply, event))
            setBuyFee(buy_total(props.cur_supply, event) - buy_price(props.cur_supply, event))
        } else {
            let tocal = event
            if (event > balAmount){
                setAmount(balAmount)
                tocal = balAmount
            }
            setSellPrice(sell_price(props.cur_supply, tocal))
            setSellTotal(sell_total(props.cur_supply, tocal))
            setSellFee(sell_price(props.cur_supply, tocal) - sell_total(props.cur_supply, tocal))
        }
    }

    return (
        <>
        {props.showModal ? ( props.isbuy ? (
        <Background>
            <ModalWrapper showModal={props.showModal}>
                <ModalContent>
                    <ModalRow_first>
                        <p>Amount</p>
                        <NumericInput
                            label='Amount'
                            className="form-control"
                            name='amount'
                            value={amount}
                            min={ 0 }
                            max={ 100 }
                            step={ 1 }
                            precision={ 0 }
                            mobile
                            onChange= {(event) => handle_AmountChange(event, 1)}
                            pattern="[0-9].[0-9][0-9]"
                        />
                    </ModalRow_first>
                    <ModalRow_rest>
                    <p>Price</p>
                    <p>Ξ {buyPrice.toFixed(5)}</p>
                    </ModalRow_rest>
                    <ModalRow_rest>
                    <p>Fee</p>
                    <p>Ξ {buyFee.toFixed(5)}</p>
                    </ModalRow_rest>
                    <ModalRow_rest>
                    <p>Paying</p>
                    <p>Ξ {buyTotal.toFixed(5)}</p>
                    </ModalRow_rest>
                </ModalContent>
                <CloseModalButton aria-modal='Close modal' onClick={() => props.setShowModal(prev => !prev)}/>
            <button className='buy-btn-modal'
                    single_id={props.id}
                    onClick={(event) => {
                        buyToken(props.id, amount)
                    }}
            >
            BUY
            </button>
            </ModalWrapper>
        </Background>
        ):
        <Background>
            <ModalWrapper showModal={props.showModal}>
                <ModalContent>
                    <ModalRow_first>
                        <p>Amount</p>
                        <NumericInput
                            label='Amount'
                            className="form-control"
                            name='amount'
                            value={amount}
                            min={ 0 }
                            max={ balAmount }
                            step={ 1 }
                            precision={ 0 }
                            mobile
                            onChange= {(event) => handle_AmountChange(event, 0)}
                            pattern="[0-9].[0-9][0-9]"
                        />
                    </ModalRow_first>
                    <ModalRow_rest>
                    <p>Price</p>
                    <p>Ξ {sellPrice.toFixed(5)}</p>
                    </ModalRow_rest>
                    <ModalRow_rest>
                    <p>Fee</p>
                    <p>Ξ {sellFee.toFixed(5)}</p>
                    </ModalRow_rest>
                    <ModalRow_rest>
                    <p>Receiving</p>
                    <p>Ξ {sellTotal.toFixed(5)}</p>
                    </ModalRow_rest>
                </ModalContent>
                <CloseModalButton aria-modal='Close modal' onClick={() => props.setShowModal(prev => !prev)}/>
            <button className='sell-btn-modal'
                    single_id={props.id}
                    onClick={(event) => {
                        sellToken(props.id, amount)
                    }}
            >
            SELL
            </button>
            </ModalWrapper>
        </Background>
        ): null}
        </>
    );
}
export default Modal;
import React from 'react';
import styled from 'styled-components';
import { MdClose } from "react-icons/md";

export const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.85);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: top;
`

export const ModalWrapper = styled.div `
    width: 400px;
    height: 250px;
    margin-top: 13%;
    box-shadow: 0 5px 16px rgba(0,0,0, 0.2);
    background: #161616;
    color: #fff;
    display: grid;
    position: relative;
    border-radius: 10px;
`

export const ModalImg = styled.img `
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: #000;
`

export const ModalRow_first = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    p {
        margin-left: 1.5rem;
        color: #fff;
    }
`
export const ModalRow_rest = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    gap: 10px;
    align-items: center;
    justify-content: center;

    p {
        margin-left: 2rem;
        color: #fff;
        justify-content: center;
    }

`
export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;

    p {
        margin-bottom: 1.2rem;
        color: #fff;

    }

    botton {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`;

export const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 16px;
    height: 16px;
    padding: 0;
    z-index: 10;
`;
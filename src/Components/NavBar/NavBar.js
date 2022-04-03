import React from 'react';
import styled from 'styled-components';
import logoImg from '../../image/logo.svg'
import signImg from '../../image/sign.svg'

const NavBarStyled = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 80px;
    width: 100%; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #299B01;
    color: white;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
`;

const H1 = styled.h1`
    font-size: 24px;
    margin-left: 15px;
`;

const ImgLogo = styled.img`
    width: 50px;
`;

const ImgSign = styled.img`
    width: 30px;
    margin-bottom: 5px;
`

const SignButton = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 16px;
`

export const NavBar = () => (
    <NavBarStyled>
        <Logo>
            <ImgLogo src={logoImg} alt="Логотип"/>
            <H1>MrDonald's</H1>
        </Logo>
        <SignButton>
            <ImgSign src={signImg} alt="Войти"></ImgSign>
            <p>Войти</p>
        </SignButton>
    </NavBarStyled>
)
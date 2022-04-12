import React from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem'
import { Banner } from './Banner';
import { useFetch } from '../Hooks/useFetch'
import logoImg from '../../image/logo.svg'

const MenuStyled = styled.main`
    background-color: #ccc;
    margin-top: 80px;
    margin-left: 380px;
`;

const SectionMenu = styled.section`
    padding: 30px;
`;

const Preloader = styled.img`
    width: 50px;
    height: 50px;
    animation: rotate 2s linear infinite;
    @keyframes rotate{
        100%{
         transform: rotate(360deg)
        }
`;

export const Menu = ({ setOpenItem }) => {

    const res = useFetch();
    const dbMenu = res.response;

    return (
        <MenuStyled>
            <Banner/>
            {res.response ?
                <>
                    <SectionMenu>
                        <h2>Бургеры</h2>
                        <ListItem 
                            itemList={dbMenu.burger}
                            setOpenItem={setOpenItem}
                        />
                    </SectionMenu>
                    <SectionMenu>
                        <h2>Закуски / Напитки</h2>
                        <ListItem 
                            itemList={dbMenu.other}
                            setOpenItem={setOpenItem}
                        />
                    </SectionMenu>
                </> : res.error ?
                <div>Sorry, we will fix it soon...</div> :
                <Preloader src={logoImg}/>
            }
        </MenuStyled>
    )
};
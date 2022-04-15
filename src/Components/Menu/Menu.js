import React, { useContext} from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem'
import { Banner } from './Banner';
import { useFetch } from '../Hooks/useFetch'
import logoImg from '../../image/logo.svg'
import { Context } from '../Functions/context'
import arrowImg from '../../image/arrow.svg'

const MenuStyled = styled.main`
    background-color: ${({bgColor}) => `${bgColor}`};
    margin-top: 80px;
    margin-left: ${({mgLeft}) => `${mgLeft}`};
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

const ToggleOrder = styled.div`
    position: fixed;
    width: 40px;
    height: 40px;
    background-image: url(${arrowImg});
    background-repeat: no-repeat;
    transform: rotate(${({deg}) => `${deg}`});
    margin: 15px;
    background-color: rgba(0,0,0, 0.5);
    z-index: 99;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: rgba(0,0,0, 0.8);
    }
`

export const Menu = () => {
    const { openItem: { setOpenItem }} = useContext(Context);
    const { openOrder: { openOrder, setOpenOrder }} = useContext(Context);
    const res = useFetch();
    const dbMenu = res.response;

    return (
        <MenuStyled mgLeft={openOrder ? "380px" : "0px"} bgColor={openOrder ? "#ccc" : "#fff"}>
            {<ToggleOrder deg={openOrder ? "0deg" : "180deg"} onClick={() => {openOrder ? setOpenOrder(null) : setOpenOrder(true)}}/>}
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
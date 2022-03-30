import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 20;
`;

const Modal = styled.div`
    background-color: #fff;
    width: 600px;
    height: 600px;
`
const Banner = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${({img}) => img});
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
`;

const ModalTitleItem = styled.div`
    display: flex;
    justify-content: space-around;
    font-family: Pacifico;
    font-size: 24px;
`
const ModalButton = styled.button`
    background-color: #299b01;
    border: none;
    color: white;
    position: absolute;
    width: 250px;
    height: 65px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 200px;
`

export const ModalItem = ({ openItem, setOpenItem }) => {
    
    function closeModal(e) {
        if (e.target.id === 'overlay') {
            setOpenItem(null);
        }
    }
    
    if (!openItem) return null;
    return (
        <Overlay id="overlay" onClick={closeModal}>
            <Modal>
                <Banner img={openItem.img}/>
                <ModalTitleItem>
                    <p>{openItem.name}</p>
                    <p>{openItem.price.toLocaleString('ru-RU',
                        {style: 'currency', currency: 'RUB'})}</p>
                </ModalTitleItem>
                <ModalButton>
                    Добавить
                </ModalButton>
            </Modal>
        </Overlay>
    )
};
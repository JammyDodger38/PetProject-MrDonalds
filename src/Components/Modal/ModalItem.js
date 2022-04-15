import React, { useContext } from 'react';
import styled from 'styled-components';
import {ButtonCheckout} from "../Style/ButtonCheckout"
import {CountItem} from './CountItem'
import {useCount} from '../Hooks/useCount'
import { totalPriceItems } from '../Functions/secondaryFunction'
import { formatCurrency } from '../Functions/secondaryFunction'
import { Toppings } from './Toppings'
import { Choices } from './Choices'
import { useToppings } from '../Hooks/useToppings'
import { useChoices } from '../Hooks/useChoices'
import { Context } from '../Functions/context'
import {Overlay} from '../Style/Popup'

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
`;

const Content = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 200px);
    padding: 30px;
`;

const ModalTitleItem = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Pacifico', cursive;
    font-size: 24px;
    font-weight: 700;
`;

const TotalPriceItem = styled.div`
    display: flex;
    justify-content: space-between;
`



export const ModalItem = () => {
    const {openItem: { openItem, setOpenItem }} = useContext(Context);
    const {orders: { orders, setOrders }} = useContext(Context);

    const counter = useCount(openItem.count);
    const toppings = useToppings(openItem);
    const choices = useChoices(openItem);
    const isEdit = openItem.index > -1;

    const closeModal = e => {
        if (e.target.id === 'overlay') {
            setOpenItem(null);
        }
    }
    
    const order = {
        ...openItem,
        count: counter.count,
        topping: toppings.toppings,
        choice: choices.choice,
    };

    const editOrder = () => {
        const newOrders = [...orders];
        newOrders[openItem.index] = order;
        setOrders(newOrders);
        setOpenItem(null);
    }

    const addToOrder = () => {
        setOrders([...orders, order]);
        setOpenItem(null);
    }
    return (
        <Overlay id="overlay" onClick={closeModal}>
            <Modal>
                <Banner img={openItem.img}/>
                <Content>
                    <ModalTitleItem>
                        <div>{openItem.name}</div>
                        <div>{formatCurrency(openItem.price)}</div>
                    </ModalTitleItem>
                    <CountItem {...counter}/>
                    {openItem.toppings && <Toppings {...toppings}/>}
                    {openItem.choices && <Choices {...choices} openItem={openItem}/>}
                    <TotalPriceItem>
                        <span>Цена:</span>
                        <span>{formatCurrency(totalPriceItems(order))}</span>
                    </TotalPriceItem>
                    <ButtonCheckout 
                        onClick={isEdit ? editOrder : addToOrder}
                        disabled={order.choices && !order.choice}
                        >{isEdit ? "Редактировать" : "Добавить"}</ButtonCheckout>
                </Content>
            </Modal>
        </Overlay>
    )
};
import React, { useContext } from "react";
import styled from "styled-components";
import {Overlay, OrderTitle, Total, TotalPrice } from '../Style/Popup'
import {ButtonCheckout} from '../Style/ButtonCheckout';
import { projection } from '../Functions/secondaryFunction';
import { totalPriceItems } from '../Functions/secondaryFunction';
import { formatCurrency } from '../Functions/secondaryFunction';
import { Context } from '../Functions/context';

const Modal = styled.div`
    background-color: white;
    width: 600px;
    padding: 30px;
`;

const Text = styled.h3`
    text-align: center;
    margin-bottom: 30px;
`;

const rulesData = {
    itemName: ['name'],
    price: ['price'],
    count: ['count'],
    topping: ['topping', arr => arr.filter(obj => obj.checked).map(obj => obj.name),
        arr => arr.length ? arr : 'no topping'],
    choice: ['choice', item => item ? item : 'no choices'],
}

const sendOrder = (dataBase, orders, authentication) => {
    const newOrder = orders.map(projection(rulesData));
    dataBase.ref('orders').push().set({
        nameClient: authentication.displayName,
        email: authentication.email,
        order: newOrder,
    });
}

export const OrderConfirm = ({firebaseDatabase}) => {
    const dataBase = firebaseDatabase();

    const {auth: { authentication }} = useContext(Context);
    const {orders: { orders, setOrders }} = useContext(Context);
    const {orderConfirm: { setOpenOrderConfirm }} = useContext(Context);

    const total = orders.reduce((result, order) => 
        totalPriceItems(order) + result, 0);

        return (
            <Overlay>
                <Modal>
                    <OrderTitle>{authentication.displayName}</OrderTitle>
                    <Text>Осталось только подтвердить ваш заказ</Text>
                    <Total>
                        <span>Итого</span>
                        <TotalPrice>{formatCurrency(total)}</TotalPrice>
                    </Total>
                    <ButtonCheckout onClick={() => {
                        sendOrder(dataBase, orders, authentication);
                        setOrders([]);
                        setOpenOrderConfirm(false);
                    }}>
                        Подтвердить
                    </ButtonCheckout>
                </Modal>
            </Overlay>
        )
}
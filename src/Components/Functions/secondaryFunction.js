export const totalPriceItems = order => {
    const countTopping = order.topping && order.topping.filter(item => item.checked).length
    const pricetopping = countTopping > 0 ? (order.price * 0.1) * countTopping : 0;
    return (order.price + pricetopping) * order.count;
};

export const formatCurrency = value => value.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'});
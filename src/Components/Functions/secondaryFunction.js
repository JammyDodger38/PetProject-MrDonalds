export const totalPriceItems = order => order.price * order.count;
export const formatCurrency = value => value.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
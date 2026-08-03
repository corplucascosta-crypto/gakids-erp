export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
export const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
};

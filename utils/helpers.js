export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const generateUUID = () => {
    return crypto.randomUUID();
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

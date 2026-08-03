import { db } from '/services/supabase.js';
import { formatCurrency, formatNumber } from '/utils/helpers.js';
export default class Dashboard {
    constructor() { this.cards = []; this.initialize(); }
    async initialize() { await this.loadData(); this.renderCards(); }
    async loadData() {
        const { data, error } = await db.getDashboardData();
        if (!error) this.cards = this.processData(data);
    }
    processData(data) {
        return [
            { id: 'balance', label: 'Saldo Atual', value: formatCurrency(data.balance), icon: 'fa-wallet', color: 'primary' },
            { id: 'revenue', label: 'Receita do Mês', value: formatCurrency(data.revenue), icon: 'fa-arrow-up', color: 'success' },
            { id: 'expenses', label: 'Despesas do Mês', value: formatCurrency(data.expenses), icon: 'fa-arrow-down', color: 'danger' },
            { id: 'profit', label: 'Lucro do Mês', value: formatCurrency(data.profit), icon: 'fa-chart-line', color: 'warning' },
            { id: 'margin', label: 'Margem', value: data.margin + '%', icon: 'fa-percent', color: 'success' },
            { id: 'sales', label: 'Vendas', value: formatNumber(data.totalSales), icon: 'fa-shopping-cart', color: 'primary' },
            { id: 'inventory', label: 'Estoque Total', value: formatNumber(data.totalProducts), icon: 'fa-boxes', color: 'warning' },
            { id: 'out-of-stock', label: 'Sem Estoque', value: formatNumber(data.outOfStock), icon: 'fa-exclamation-triangle', color: 'danger' }
        ];
    }
    renderCards() {
        const grid = document.getElementById('dashboardGrid');
        if (!grid) return;
        grid.innerHTML = '';
        this.cards.forEach(card => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<div class="header"><span class="label">${card.label}</span><span class="icon ${card.color}"><i class="fas ${card.icon}"></i></span></div><div class="value">${card.value}</div>`;
            grid.appendChild(div);
        });
    }
}

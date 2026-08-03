import { db } from '../../services/supabase.js';
import { formatCurrency, formatNumber } from '../../utils/helpers.js';

export default class Dashboard {
    constructor() {
        this.data = {};
        this.initialize();
    }

    async initialize() {
        await this.loadData();
        this.renderCards();
        this.renderCharts();
    }

    async loadData() {
        const { data, error } = await db.getDashboardData();
        if (!error) this.data = data;
    }

    renderCards() {
        const grid = document.getElementById('dashboardGrid');
        if (!grid) return;

        const cards = [
            { label: 'Saldo Atual', value: formatCurrency(this.data.balance), icon: 'fa-wallet', color: 'primary' },
            { label: 'Receita do Mês', value: formatCurrency(this.data.revenue), icon: 'fa-arrow-up', color: 'success' },
            { label: 'Despesas do Mês', value: formatCurrency(this.data.expenses), icon: 'fa-arrow-down', color: 'danger' },
            { label: 'Lucro do Mês', value: formatCurrency(this.data.profit), icon: 'fa-chart-line', color: 'warning' },
            { label: 'Margem', value: this.data.margin + '%', icon: 'fa-percent', color: 'success' },
            { label: 'Vendas', value: formatNumber(this.data.totalSales), icon: 'fa-shopping-cart', color: 'primary' },
            { label: 'Estoque Total', value: formatNumber(this.data.totalProducts), icon: 'fa-boxes', color: 'warning' },
            { label: 'Sem Estoque', value: formatNumber(this.data.outOfStock), icon: 'fa-exclamation-triangle', color: 'danger' }
        ];

        grid.innerHTML = '';
        cards.forEach(card => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <div class="header"><span class="label">${card.label}</span><span class="icon ${card.color}"><i class="fas ${card.icon}"></i></span></div>
                <div class="value">${card.value}</div>
            `;
            grid.appendChild(div);
        });
    }

    renderCharts() {
        // Criar o espaço para o gráfico
        const grid = document.getElementById('dashboardGrid');
        const chartCard = document.createElement('div');
        chartCard.className = 'card full-width';
        chartCard.style.marginTop = '20px';
        chartCard.innerHTML = `
            <h5 style="margin-bottom: 15px; color: #333;">Faturamento Mensal</h5>
            <canvas id="revenueChart" width="400" height="200"></canvas>
        `;
        grid.appendChild(chartCard);

        // Renderizar o gráfico usando a biblioteca Chart.js que está no HTML
        const ctx = document.getElementById('revenueChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
                datasets: [{
                    label: 'Faturamento (R$)',
                    data: [12000, 19000, 3000, 5000, 20000, 30000],
                    borderColor: '#7C3AED',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

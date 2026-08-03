import { auth } from '../../services/supabase.js';
import Dashboard from './dashboard.js';

class App {
    constructor() { this.init(); }
    async init() {
        this.loadTheme();
        this.setupSidebar();
        this.setupThemeToggle();
        this.loadDashboard();
    }
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        const updateIcon = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        };
        updateIcon();
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon();
        });
    }
    setupSidebar() {
        const toggle = document.getElementById('toggleSidebar');
        const sidebar = document.getElementById('sidebar');
        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                if (window.innerWidth <= 767) sidebar.classList.toggle('open');
            });
        }
    }
    loadDashboard() {
        if (window.location.pathname.includes('/dashboard/') || window.location.pathname === '/') {
            new Dashboard();
        }
    }
}
new App();

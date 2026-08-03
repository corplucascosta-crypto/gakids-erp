import { auth } from '/services/supabase.js';

class App {
    constructor() { this.init(); }
    async init() {
        await this.checkAuth();
        this.loadTheme();
        this.setupSidebar();
        this.setupThemeToggle();
        this.loadDashboard();
    }
    async checkAuth() {
        const user = await auth.getCurrentUser();
        if (!user && !window.location.pathname.includes('/login/')) {
            window.location.href = '/login/';
        }
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
            import('/assets/js/dashboard.js').then(module => new module.default());
        }
    }
}
new App();

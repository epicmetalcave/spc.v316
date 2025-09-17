// shell/dashboard/index.js
import theme from '../core-plugins/theme.js';
import Panel from './panel.js';

const dashboard = {
    panels: new Map(),
    
    init() {
        // Set body styles (no color)
        document.body.style.background = 'var(--bg)';
        document.body.style.margin = '0';
        document.body.style.fontFamily = 'monospace';
        document.body.style.overflow = 'hidden';

        // Initialize theme
        theme.init();
        
        // Create dashboard container - 2px from each edge
        const container = document.createElement('div');
        container.id = 'dashboard';
        container.style.position = 'absolute';
        container.style.top = '2px';
        container.style.left = '2px';
        container.style.right = '2px';
        container.style.bottom = '2px';
        document.body.appendChild(container);
        
        // Listen for new panels created by splitting
        container.addEventListener('panel-created', (e) => {
            this.registerPanel(e.detail);
        });
        
        // Create first panel
        const panel = new Panel('root');
        container.appendChild(panel.element);
        this.registerPanel(panel);
        
        console.log('Dashboard initialized');
    },
    
    registerPanel(panel) {
        this.panels.set(panel.id, panel);
    },
    
    removePanel(panelId) {
        const panel = this.panels.get(panelId);
        if (panel && panel.element.parentNode) {
            panel.element.parentNode.removeChild(panel.element);
            this.panels.delete(panelId);
        }
    },
    
    execute() {
        return { 
            initialized: true,
            panels: this.panels.size
        };
    }
};

export default dashboard;
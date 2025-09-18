// ===== shell/dashboard/index.js =====
import theme from '../core-plugins/theme.js';
import layout from './layout.js';
import renderer from './renderer.js';
import events from './events.js';

const dashboard = {
    init() {
        // Set body styles
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
        container.style.border = '1px solid var(--ui)';
        container.style.display = 'flex';
        document.body.appendChild(container);
        
        // Initialize systems
        renderer.init('dashboard');
        events.init(layout, renderer);
        
        // Initial render
        renderer.render(layout.getTree());
        
        console.log('Dashboard initialized');
    },
    
    execute() {
        return { 
            initialized: true,
            panels: 1  // Simple default for now
        };
    }
};
export default dashboard;
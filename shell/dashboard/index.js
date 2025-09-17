// shell/dashboard/index.js
import Panel from './panel.js';

const Dashboard = {
    panels: new Map(),
    container: null,
    activePanel: null,
    initialized: false,

    init() {
        if (this.initialized) return;

        // Create or get container
        this.container = document.getElementById('dashboard');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'dashboard';
            document.body.appendChild(this.container);
        }

        // Create default panel
        const root = new Panel('root', this);
        this.panels.set('root', root);
        this.container.appendChild(root.render());

        // Set as active
        this.setActivePanel('root');

        this.initialized = true;
        return true;
    },
    
    setActivePanel(panelId) {
        // Deactivate all
        this.panels.forEach(panel => panel.setActive(false));
        
        // Activate target
        const panel = this.panels.get(panelId);
        if (panel) {
            panel.setActive(true);
            this.activePanel = panelId;
        }
    },
    
    removePanel(panelId) {
        const panel = this.panels.get(panelId);
        if (panel) {
            panel.destroy();
            this.panels.delete(panelId);
            
            // If was active, activate first remaining
            if (this.activePanel === panelId && this.panels.size > 0) {
                this.setActivePanel(this.panels.keys().next().value);
            }
        }
    },
    
    execute() {
        return {
            initialized: this.initialized,
            panels: this.panels.size,
            activePanel: this.activePanel
        };
    }
};

export default Dashboard;

/*
DASHBOARD SYSTEM

Orchestrates panel management for the shell interface.

Core responsibilities:
- Initialize dashboard container in DOM
- Manage panel registry (Map)
- Track active panel state
- Handle panel lifecycle (create/remove)

Structure:
- panels: Map of panelId → Panel instance
- container: DOM element hosting all panels
- activePanel: Currently focused panel ID
- initialized: Prevents duplicate initialization

The dashboard is a thin orchestrator. It doesn't define how panels split,
resize, or display plugins. It only manages which panels exist and which
one is active.
*/
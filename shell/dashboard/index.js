// shell/dashboard/index.js

const Dashboard = {
    panels: new Map(),
    layout: {},
    activePanel: null,
    initialized: false,
    
    init() {
        if (this.initialized) return;
        
        // Load saved layout or create default
        const saved = this.loadLayout();
        if (saved) {
            this.restoreLayout(saved);
        } else {
            this.createDefaultLayout();
        }
        
        this.initialized = true;
        return true;
    },
    
    createDefaultLayout() {
        const Panel = require('./panel');
        const root = new Panel('root');
        
        this.panels.set('root', root);
        this.layout = { 
            root: { 
                type: 'panel', 
                id: 'root' 
            } 
        };
        this.activePanel = 'root';
        
        this.saveLayout();
    },
    
    splitPanel(panelId, direction) {
        const panel = this.panels.get(panelId);
        if (!panel) {
            return { error: 'Panel not found' };
        }
        
        const Panel = require('./panel');
        const leftId = `${panelId}-${direction === 'horizontal' ? 'top' : 'left'}`;
        const rightId = `${panelId}-${direction === 'horizontal' ? 'bottom' : 'right'}`;
        
        const left = new Panel(leftId);
        const right = new Panel(rightId);
        
        this.panels.set(leftId, left);
        this.panels.set(rightId, right);
        this.panels.delete(panelId);
        
        this.layout[panelId] = {
            type: 'split',
            direction,
            children: [leftId, rightId]
        };
        this.layout[leftId] = { 
            type: 'panel', 
            id: leftId,
            parent: panelId 
        };
        this.layout[rightId] = { 
            type: 'panel', 
            id: rightId,
            parent: panelId 
        };
        
        panel.destroy();
        this.activePanel = leftId;
        
        this.saveLayout();
        return { left: leftId, right: rightId };
    },
    
    deletePanel(panelId) {
        if (this.panels.size === 1) {
            return false;
        }
        
        const panel = this.panels.get(panelId);
        if (panel) {
            panel.destroy();
            this.panels.delete(panelId);
        }
        
        delete this.layout[panelId];
        
        if (this.activePanel === panelId) {
            this.activePanel = this.panels.keys().next().value;
        }
        
        if (this.panels.size === 0) {
            this.createDefaultLayout();
        }
        
        this.saveLayout();
        return true;
    },
    
    setActivePanel(panelId) {
        if (!this.panels.has(panelId)) {
            return false;
        }
        
        if (this.activePanel) {
            const current = this.panels.get(this.activePanel);
            if (current) current.setActive(false);
        }
        
        this.activePanel = panelId;
        const panel = this.panels.get(panelId);
        if (panel) panel.setActive(true);
        
        return true;
    },
    
    saveLayout() {
        const data = {
            panels: Array.from(this.panels.keys()),
            layout: this.layout,
            activePanel: this.activePanel
        };
        
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('dashboard-layout', JSON.stringify(data));
            }
        } catch (e) {
            console.error('Failed to save layout:', e);
        }
    },
    
    loadLayout() {
        try {
            if (typeof localStorage !== 'undefined') {
                const data = localStorage.getItem('dashboard-layout');
                return data ? JSON.parse(data) : null;
            }
        } catch (e) {
            console.error('Failed to load layout:', e);
        }
        return null;
    },
    
    restoreLayout(saved) {
        const Panel = require('./panel');
        
        saved.panels.forEach(panelId => {
            const panel = new Panel(panelId);
            this.panels.set(panelId, panel);
        });
        
        this.layout = saved.layout || {};
        this.activePanel = saved.activePanel || saved.panels[0];
        
        if (this.activePanel) {
            const panel = this.panels.get(this.activePanel);
            if (panel) panel.setActive(true);
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

module.exports = Dashboard;
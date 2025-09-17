// shell/dashboard/index.js

class Dashboard {
    constructor() {
        this.panels = new Map();
        this.container = null;
    }

    init() {
        // Inject dashboard styles
        this.injectStyles();
        
        // Create container
        this.container = document.createElement('div');
        this.container.id = 'dashboard';
        document.body.appendChild(this.container);
        
        // Create first panel
        this.createPanel('root');
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body { background: #000; color: #0f0; font-family: monospace; margin: 0; padding: 0; height: 100vh; overflow: hidden; }
            #dashboard { width: 100vw; height: 100vh; display: flex; }
            .panel { border: 1px solid #0f0; flex: 1; padding: 10px; cursor: pointer; }
            .panel.active { border-color: #0ff; box-shadow: 0 0 10px #0ff; }
        `;
        document.head.appendChild(style);
    }

    createPanel(id) {
        const panel = document.createElement('div');
        panel.className = 'panel active';
        panel.id = id;
        panel.textContent = '[Plugin Library]';
        panel.onclick = () => this.setActive(id);
        
        this.panels.set(id, panel);
        this.container.appendChild(panel);
    }

    setActive(id) {
        this.panels.forEach((panel, panelId) => {
            panel.classList.toggle('active', panelId === id);
        });
    }

    execute() {
        return { panels: this.panels.size };
    }
}

export default new Dashboard();
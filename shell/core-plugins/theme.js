// shell/core-plugins/theme.js
const theme = {
    name: 'Theme',
    version: '1.0.0',
    
    // Theme configuration
    defaults: {
        background: '#000',
        text: '#0f0',
        ui: '#0f0',
        font: 'monospace',
        size: 1  // Base size multiplier
    },
    
    init() {
        // Get or create style element
        let style = document.getElementById('theme-variables');
        if (!style) {
            style = document.createElement('style');
            style.id = 'theme-variables';
            document.head.appendChild(style);
        }
        
        // Apply defaults
        this.apply(this.defaults);
    },
    
    apply(config) {
        const style = document.getElementById('theme-variables');
        if (!style) return;
        
        style.textContent = `
            :root {
                --bg: ${config.background};
                --text: ${config.text};
                --ui: ${config.ui};
                --font: ${config.font};
                --size: ${config.size};
            }
            body {
                background: var(--bg);
                color: var(--text);
                font-family: var(--font);
                font-size: calc(14px * var(--size));
            }
        `;
    },
    
    execute() {
        return {
            name: this.name,
            version: this.version,
            config: this.defaults
        };
    }
};

export default theme;
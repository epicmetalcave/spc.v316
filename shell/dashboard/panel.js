// shell/dashboard/panel.js
import createHeader from './header.js';
import createPlugin from './plugin.js';
import initResize, { resizePanel } from './resize.js';
import splitPanel from './split.js';

class Panel {
    constructor(id) {
        this.id = id;
        this.plugin = 'Plugin Library';
        this.element = this.createElement();
        
        // Add resize functionality
        initResize(this.element);
        
        // Add split/resize arrows
        this.addArrows();
    }
    
    createElement() {
        const div = document.createElement('div');
        div.className = 'panel';
        div.id = this.id;
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.right = '0';
        div.style.bottom = '0';
        div.style.border = '1px solid var(--ui)';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        
        // Assemble panel from parts
        const header = createHeader(this.plugin, this.id);
        const plugin = createPlugin(this.plugin);
        
        div.appendChild(header);
        div.appendChild(plugin);
        
        return div;
    }
    
    addArrows() {
        const arrows = {
            top: { symbol: '▼', style: { top: '4px', left: '50%', transform: 'translateX(-50%)' } },
            bottom: { symbol: '▲', style: { bottom: '4px', left: '50%', transform: 'translateX(-50%)' } },
            left: { symbol: '▶', style: { left: '4px', top: '50%', transform: 'translateY(-50%)' } },
            right: { symbol: '◀', style: { right: '4px', top: '50%', transform: 'translateY(-50%)' } }
        };
        
        Object.entries(arrows).forEach(([edge, config]) => {
            const arrow = document.createElement('div');
            arrow.className = `arrow arrow-${edge}`;
            arrow.style.position = 'absolute';
            arrow.style.cursor = 'pointer';
            arrow.style.zIndex = '10';
            arrow.style.color = 'var(--ui)';
            arrow.style.fontSize = '12px';
            arrow.style.padding = '2px';
            arrow.style.userSelect = 'none';
            arrow.innerHTML = config.symbol;
            
            Object.assign(arrow.style, config.style);
            
            let holdTimer = null;
            let isHolding = false;
            
            // Click for resize (5% adjustment)
            arrow.onclick = (e) => {
                e.stopPropagation();
                if (!isHolding) {
                    resizePanel(this.element, edge);
                }
                isHolding = false;
            };
            
            // Long press for split
            arrow.onmousedown = (e) => {
                e.stopPropagation();
                isHolding = false;
                
                holdTimer = setTimeout(() => {
                    isHolding = true;
                    const newPanel = splitPanel(this.element, edge);
                    // Notify dashboard about new panel
                    const dashboard = document.getElementById('dashboard');
                    dashboard.dispatchEvent(new CustomEvent('panel-created', { detail: newPanel }));
                }, 500); // 500ms hold for split
            };
            
            arrow.onmouseup = () => {
                if (holdTimer) {
                    clearTimeout(holdTimer);
                    holdTimer = null;
                }
            };
            
            arrow.onmouseleave = () => {
                if (holdTimer) {
                    clearTimeout(holdTimer);
                    holdTimer = null;
                }
            };
            
            this.element.appendChild(arrow);
        });
    }
}

export default Panel;
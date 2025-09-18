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
        
        // Add edge indicators
        this.addEdgeIndicators();
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
        
        // Shared border approach: only right and bottom borders
        div.style.borderRight = '1px solid var(--ui)';
        div.style.borderBottom = '1px solid var(--ui)';
        div.style.borderTop = 'none';
        div.style.borderLeft = 'none';
        
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        
        // Assemble panel from parts
        const header = createHeader(this.plugin, this.id);
        const plugin = createPlugin(this.plugin);
        
        div.appendChild(header);
        div.appendChild(plugin);
        
        return div;
    }
    
    addEdgeIndicators() {
        const indicators = {
            top: { symbol: '═', style: { top: '1px', left: '50%', transform: 'translateX(-50%)' } },
            bottom: { symbol: '═', style: { bottom: '1px', left: '50%', transform: 'translateX(-50%)' } },
            left: { symbol: '‖', style: { left: '1px', top: '50%', transform: 'translateY(-50%)' } },
            right: { symbol: '‖', style: { right: '1px', top: '50%', transform: 'translateY(-50%)' } }
        };
        
        Object.entries(indicators).forEach(([edge, config]) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator indicator-${edge}`;
            indicator.style.position = 'absolute';
            indicator.style.cursor = edge === 'top' || edge === 'bottom' ? 'ns-resize' : 'ew-resize';
            indicator.style.zIndex = '10';
            indicator.style.color = 'var(--ui)';
            indicator.style.fontSize = '8px';
            indicator.style.padding = '4px';
            indicator.style.userSelect = 'none';
            indicator.style.opacity = '0.5';
            indicator.innerHTML = config.symbol;
            
            Object.assign(indicator.style, config.style);
            
            let clickCount = 0;
            let clickTimer = null;
            
            // Handle single and double clicks
            indicator.onclick = (e) => {
                e.stopPropagation();
                clickCount++;
                
                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        // Single click - 5% resize
                        resizePanel(this.element, edge, 0.05);
                        clickCount = 0;
                    }, 250);
                } else if (clickCount === 2) {
                    // Double click - 50% split or balance
                    clearTimeout(clickTimer);
                    
                    // Check if edge is shared with another panel
                    const isSharedBorder = checkSharedBorder(this.element, edge);
                    
                    if (isSharedBorder) {
                        // Balance to 50/50
                        balancePanels(this.element, edge);
                    } else {
                        // Create new panel at 50%
                        const newPanel = splitPanel(this.element, edge, 0.5);
                        // Notify dashboard about new panel
                        const dashboard = document.getElementById('dashboard');
                        dashboard.dispatchEvent(new CustomEvent('panel-created', { detail: newPanel }));
                    }
                    
                    clickCount = 0;
                }
            };
            
            this.element.appendChild(indicator);
        });
    }
}

// Helper function to check if border is shared
function checkSharedBorder(panel, edge) {
    const container = panel.parentElement;
    const panels = Array.from(container.querySelectorAll('.panel')).filter(p => p !== panel);
    
    const currentLeft = panel.offsetLeft;
    const currentTop = panel.offsetTop;
    const currentRight = currentLeft + panel.offsetWidth;
    const currentBottom = currentTop + panel.offsetHeight;
    
    for (let otherPanel of panels) {
        const otherLeft = otherPanel.offsetLeft;
        const otherTop = otherPanel.offsetTop;
        const otherRight = otherLeft + otherPanel.offsetWidth;
        const otherBottom = otherTop + otherPanel.offsetHeight;
        
        switch(edge) {
            case 'left':
                if (Math.abs(currentLeft - otherRight) <= 2) return true;
                break;
            case 'right':
                if (Math.abs(currentRight - otherLeft) <= 2) return true;
                break;
            case 'top':
                if (Math.abs(currentTop - otherBottom) <= 2) return true;
                break;
            case 'bottom':
                if (Math.abs(currentBottom - otherTop) <= 2) return true;
                break;
        }
    }
    return false;
}

// Helper function to balance panels to 50/50
function balancePanels(panel, edge) {
    // This will be implemented in resize.js
    // For now, call resizePanel with 50% target
    resizePanel(panel, edge, 0.5, true); // true = balance mode
}

export default Panel;
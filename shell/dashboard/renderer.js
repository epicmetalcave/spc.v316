// shell/dashboard/renderer.js

const renderer = {
    container: null,
    
    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container ${containerId} not found`);
        }
    },
    
    render(tree) {
        if (!this.container) {
            throw new Error('Renderer not initialized');
        }
        
        // Clear container
        this.container.innerHTML = '';
        
        // Render tree recursively
        const element = this.renderNode(tree);
        if (element) {
            this.container.appendChild(element);
        }
    },
    
    renderNode(node) {
        if (!node) return null;
        
        if (node.type === 'panel') {
            return this.renderPanel(node);
        }
        
        if (node.type === 'split') {
            return this.renderSplit(node);
        }
        
        return null;
    },
    
    renderPanel(node) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.id = node.id;
        panel.dataset.panelId = node.id;
        
        // Flexbox child - will grow to fill space
        panel.style.flex = '1';
        panel.style.display = 'flex';
        panel.style.flexDirection = 'column';
        panel.style.position = 'relative';
        
        // Shared borders - only right and bottom
        panel.style.borderRight = '1px solid var(--ui)';
        panel.style.borderBottom = '1px solid var(--ui)';
        panel.style.borderTop = 'none';
        panel.style.borderLeft = 'none';
        
        // Create header
        const header = this.createHeader(node);
        panel.appendChild(header);
        
        // Create plugin area
        const content = this.createContent(node);
        panel.appendChild(content);
        
        // Add indicators
        this.addIndicators(panel, node.id);
        
        return panel;
    },
    
    renderSplit(node) {
        if (!node.children || node.children.length !== 2) {
            console.error('Split node must have exactly 2 children');
            return null;
        }
        
        const container = document.createElement('div');
        container.className = 'split-container';
        container.dataset.splitId = node.id;
        
        // Flexbox container
        container.style.display = 'flex';
        container.style.flex = '1';
        container.style.flexDirection = node.direction === 'horizontal' ? 'column' : 'row';
        container.style.width = '100%';
        container.style.height = '100%';
        
        const [first, second] = node.children;
        const [size1, size2] = node.sizes || [50, 50];
        
        // First child
        const firstWrapper = document.createElement('div');
        firstWrapper.style.flex = size1;
        firstWrapper.style.display = 'flex';
        firstWrapper.style.overflow = 'hidden';
        const firstElement = this.renderNode(first);
        if (firstElement) firstWrapper.appendChild(firstElement);
        
        // Second child
        const secondWrapper = document.createElement('div');
        secondWrapper.style.flex = size2;
        secondWrapper.style.display = 'flex';
        secondWrapper.style.overflow = 'hidden';
        const secondElement = this.renderNode(second);
        if (secondElement) secondWrapper.appendChild(secondElement);
        
        container.appendChild(firstWrapper);
        container.appendChild(secondWrapper);
        
        return container;
    },
    
    createHeader(node) {
        const header = document.createElement('div');
        header.className = 'panel-header';
        header.style.paddingBottom = '4px';
        header.style.marginBottom = '8px';
        header.style.borderBottom = '1px solid var(--ui)';
        header.style.color = 'var(--text)';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        
        // Title
        const title = document.createElement('span');
        title.textContent = node.plugin || 'Plugin Library';
        
        // Actions
        const actions = this.createActions(node.id);
        
        header.appendChild(title);
        header.appendChild(actions);
        
        return header;
    },
    
    createActions(panelId) {
        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.gap = '8px';
        actions.style.alignItems = 'center';
        
        // Clear button
        const clearBtn = document.createElement('button');
        clearBtn.innerHTML = '&#9633;'; // □
        clearBtn.style.background = 'none';
        clearBtn.style.border = 'none';
        clearBtn.style.color = 'var(--ui)';
        clearBtn.style.cursor = 'pointer';
        clearBtn.style.fontSize = '18px';
        clearBtn.style.padding = '0';
        clearBtn.dataset.action = 'clear';
        clearBtn.dataset.panelId = panelId;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;'; // ×
        deleteBtn.style.background = 'none';
        deleteBtn.style.border = 'none';
        deleteBtn.style.color = 'var(--ui)';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.fontSize = '18px';
        deleteBtn.style.padding = '0';
        deleteBtn.dataset.action = 'delete';
        deleteBtn.dataset.panelId = panelId;
        
        actions.appendChild(clearBtn);
        actions.appendChild(deleteBtn);
        
        return actions;
    },
    
    createContent(node) {
        const content = document.createElement('div');
        content.className = 'panel-content';
        content.style.flex = '1';
        content.style.color = 'var(--text)';
        content.textContent = `[${node.plugin || 'Plugin Library'}]`;
        
        return content;
    },
    
    addIndicators(panel, panelId) {
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
            
            // Store panel ID and edge for event handling
            indicator.dataset.panelId = panelId;
            indicator.dataset.edge = edge;
            
            panel.appendChild(indicator);
        });
    }
};

export default renderer;
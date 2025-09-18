// shell/dashboard/events.js

const events = {
    layout: null,
    renderer: null,
    holdTimer: null,
    clickCount: 0,
    clickTimer: null,
    
    init(layout, renderer) {
        this.layout = layout;
        this.renderer = renderer;
        this.attachListeners();
    },
    
    attachListeners() {
        const container = document.getElementById('dashboard');
        if (!container) return;
        
        // Delegate all events to container
        container.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        container.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        container.addEventListener('click', (e) => this.handleClick(e));
    },
    
    handleMouseDown(e) {
        const indicator = e.target.closest('.indicator');
        if (!indicator) return;
        
        e.stopPropagation();
        const panelId = indicator.dataset.panelId;
        const edge = indicator.dataset.edge;
        
        // Clear any existing timers
        this.clearTimers();
        
        // Start hold timer for split (500ms)
        this.holdTimer = setTimeout(() => {
            this.handleSplit(panelId, edge);
            this.holdTimer = null;
        }, 500);
    },
    
    handleMouseUp(e) {
        const indicator = e.target.closest('.indicator');
        if (!indicator) return;
        
        e.stopPropagation();
        
        // If hold timer still active, it was a click not a hold
        if (this.holdTimer) {
            this.clearTimers();
            
            const panelId = indicator.dataset.panelId;
            const edge = indicator.dataset.edge;
            
            // Count clicks for single/double detection
            this.clickCount++;
            
            if (this.clickCount === 1) {
                this.clickTimer = setTimeout(() => {
                    // Single click - 5% resize
                    this.handleResize(panelId, edge, 5);
                    this.clickCount = 0;
                }, 250);
            } else if (this.clickCount === 2) {
                // Double click - balance 50/50
                clearTimeout(this.clickTimer);
                this.handleBalance(panelId, edge);
                this.clickCount = 0;
            }
        }
    },
    
    handleClick(e) {
        // Handle action buttons
        const button = e.target.closest('button');
        if (!button) return;
        
        const action = button.dataset.action;
        const panelId = button.dataset.panelId;
        
        if (!action || !panelId) return;
        
        switch(action) {
            case 'clear':
                this.handleClear(panelId);
                break;
            case 'delete':
                this.handleDelete(panelId);
                break;
        }
    },
    
    handleSplit(panelId, edge) {
        // Check if already has adjacent panel
        const hasAdjacent = this.checkAdjacent(panelId, edge);
        
        if (!hasAdjacent) {
            // Create new 50% split
            const direction = (edge === 'top' || edge === 'bottom') ? 'horizontal' : 'vertical';
            this.layout.split(panelId, direction, edge);
            
            // Re-render
            this.renderer.render(this.layout.getTree());
            
            // Re-attach listeners after DOM update
            this.attachListeners();
        }
    },
    
    handleResize(panelId, edge, percentage) {
        // Find parent split node
        const parent = this.layout.findParent(panelId);
        if (!parent || parent.type !== 'split') return;
        
        // Check if resize is valid for this edge
        const canResize = this.canResize(panelId, edge, parent);
        if (!canResize) return;
        
        // Adjust sizes
        const currentSizes = parent.sizes || [50, 50];
        const childIndex = parent.children.findIndex(child => 
            (typeof child === 'string' && child === panelId) ||
            (typeof child === 'object' && child.id === panelId)
        );
        
        if (childIndex === -1) return;
        
        // Calculate new sizes
        let newSizes = [...currentSizes];
        if (childIndex === 0) {
            // First child
            if ((edge === 'right' && parent.direction === 'vertical') ||
                (edge === 'bottom' && parent.direction === 'horizontal')) {
                // Shrink first child
                newSizes[0] = Math.max(10, newSizes[0] - percentage);
                newSizes[1] = 100 - newSizes[0];
            }
        } else {
            // Second child
            if ((edge === 'left' && parent.direction === 'vertical') ||
                (edge === 'top' && parent.direction === 'horizontal')) {
                // Shrink second child
                newSizes[1] = Math.max(10, newSizes[1] - percentage);
                newSizes[0] = 100 - newSizes[1];
            }
        }
        
        // Update layout
        this.layout.updateSizes(parent.id, newSizes);
        
        // Re-render
        this.renderer.render(this.layout.getTree());
        this.attachListeners();
    },
    
    handleBalance(panelId, edge) {
        // Find parent split
        const parent = this.layout.findParent(panelId);
        if (!parent || parent.type !== 'split') return;
        
        // Set to 50/50
        this.layout.updateSizes(parent.id, [50, 50]);
        
        // Re-render
        this.renderer.render(this.layout.getTree());
        this.attachListeners();
    },
    
    handleClear(panelId) {
        // Reset panel to default plugin
        this.layout.updatePlugin(panelId, 'Plugin Library');
        
        // Re-render
        this.renderer.render(this.layout.getTree());
        this.attachListeners();
    },
    
    handleDelete(panelId) {
        // Cannot delete last panel
        const panelCount = this.layout.countPanels();
        if (panelCount <= 1) {
            console.log('Cannot delete last panel');
            return;
        }
        
        // Delete panel and restructure tree
        this.layout.delete(panelId);
        
        // Re-render
        this.renderer.render(this.layout.getTree());
        this.attachListeners();
    },
    
    checkAdjacent(panelId, edge) {
        // Check if panel has adjacent sibling on given edge
        const parent = this.layout.findParent(panelId);
        if (!parent || parent.type !== 'split') return false;
        
        const childIndex = parent.children.findIndex(child => 
            (typeof child === 'string' && child === panelId) ||
            (typeof child === 'object' && child.id === panelId)
        );
        
        // Check based on edge and parent direction
        if (parent.direction === 'vertical') {
            if (edge === 'left' && childIndex === 1) return true;
            if (edge === 'right' && childIndex === 0) return true;
        } else {
            if (edge === 'top' && childIndex === 1) return true;
            if (edge === 'bottom' && childIndex === 0) return true;
        }
        
        return false;
    },
    
    canResize(panelId, edge, parent) {
        // Check if resize is valid based on parent split direction
        const childIndex = parent.children.findIndex(child => 
            (typeof child === 'string' && child === panelId) ||
            (typeof child === 'object' && child.id === panelId)
        );
        
        if (parent.direction === 'vertical') {
            // Can resize on left/right edges
            if (childIndex === 0 && edge === 'right') return true;
            if (childIndex === 1 && edge === 'left') return true;
        } else {
            // Can resize on top/bottom edges
            if (childIndex === 0 && edge === 'bottom') return true;
            if (childIndex === 1 && edge === 'top') return true;
        }
        
        return false;
    },
    
    clearTimers() {
        if (this.holdTimer) {
            clearTimeout(this.holdTimer);
            this.holdTimer = null;
        }
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
            this.clickTimer = null;
        }
    }
};

export default events;
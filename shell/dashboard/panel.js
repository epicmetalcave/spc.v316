// shell/dashboard/panel.js

class Panel {
    constructor(id, parent = null) {
        this.id = id;
        this.parent = parent;
        this.element = null;
        this.plugin = null;
        this.active = false;
        this.children = [];
    }
    
    render() {
        const div = document.createElement('div');
        div.className = 'panel';
        div.id = this.id;
        div.onclick = () => this.setActive();
        
        div.innerHTML = `
            <div class="panel-header">
                <span class="panel-title" onclick="this.openPlugin(event)">${this.plugin || 'Plugin Library'}</span>
                <div class="panel-actions">
                    <button class="panel-action" onclick="this.clear(event)" title="Clear Panel">&#9633;</button>
                    <button class="panel-action" onclick="this.delete(event)" title="Delete Panel">&#215;</button>
                </div>
            </div>
            <div class="panel-content">[${this.plugin || 'Plugin Library'}]</div>
        `;
        
        this.element = div;
        
        // Attach methods to element for inline onclick
        div.openPlugin = (e) => this.openPlugin(e);
        div.clear = (e) => this.clear(e);
        div.delete = (e) => this.delete(e);
        
        return div;
    }
    
    setActive(active = true) {
        this.active = active;
        if (this.element) {
            this.element.classList.toggle('active', active);
        }
    }
    
    clear(event) {
        event.stopPropagation();
        this.plugin = null;
        this.update();
    }
    
    delete(event) {
        event.stopPropagation();
        if (this.parent) {
            this.parent.removePanel(this.id);
        }
        this.destroy();
    }
    
    openPlugin(event) {
        event.stopPropagation();
        // Hook for modal system
        console.log('Opening:', this.plugin || 'Plugin Library');
    }
    
    update() {
        if (this.element) {
            const title = this.element.querySelector('.panel-title');
            const content = this.element.querySelector('.panel-content');
            title.textContent = this.plugin || 'Plugin Library';
            content.textContent = `[${this.plugin || 'Plugin Library'}]`;
        }
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

export default Panel;

/*
PANEL SYSTEM

Basic panel unit for dashboard. Each panel is a container that can:
- Display a plugin (defaults to Plugin Library)
- Be activated/deactivated (visual feedback)
- Be cleared (returns to Plugin Library)
- Be deleted (removes from dashboard)
- Open plugin in modal (via title click)

Properties:
- id: Unique identifier
- parent: Reference to parent dashboard or container
- element: DOM element
- plugin: Currently loaded plugin name
- active: Whether panel has focus
- children: For future split functionality

Operations like resize and split attach to panels but don't modify this base class.
Clear and delete are core functions, so they stay here.
*/
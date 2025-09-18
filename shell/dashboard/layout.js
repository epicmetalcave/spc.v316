// dashboard/layout.js
const layout = {
    tree: {
        type: 'panel',
        id: 'root',
        plugin: 'Plugin Library'
    },

    getTree() {
        return this.tree;
    },

    find(nodeId, node = this.tree) {
        if (node.id === nodeId) return node;

        if (node.children) {
            for (let child of node.children) {
                const found = this.find(nodeId, child);
                if (found) return found;
            }
        }

        return null;
    },

    findParent(nodeId, node = this.tree, parent = null) {
        if (node.id === nodeId) return parent;

        if (node.children) {
            for (let child of node.children) {
                const found = this.findParent(nodeId, child, node);
                if (found) return found;
            }
        }

        return null;
    },

    countPanels(node = this.tree) {
        if (node.type === 'panel') return 1;

        if (node.children) {
            return node.children.reduce((count, child) =>
                count + this.countPanels(child), 0);
        }

        return 0;
    },

    split(nodeId, direction = 'vertical', edge = 'right') {
        const node = this.find(nodeId);
        if (!node || node.type !== 'panel') return;

        const oldPanel = {...node};

        node.type = 'split';
        node.direction = direction;

        // Position new panel based on edge
        if (edge === 'right' || edge === 'bottom') {
            node.children = [
                { ...oldPanel, id: `${nodeId}-1` },
                { type: 'panel', id: `${nodeId}-2`, plugin: 'Plugin Library' }
            ];
        } else {
            node.children = [
                { type: 'panel', id: `${nodeId}-1`, plugin: 'Plugin Library' },
                { ...oldPanel, id: `${nodeId}-2` }
            ];
        }

        node.sizes = [50, 50];
        delete node.plugin;  // Remove plugin from split node
    },

    updatePlugin(nodeId, plugin) {
        const node = this.find(nodeId);
        if (node && node.type === 'panel') {
            node.plugin = plugin;
        }
    },

    updateSizes(nodeId, sizes) {
        const node = this.find(nodeId);
        if (node && node.type === 'split') {
            node.sizes = sizes;
        }
    },

    delete(nodeId) {
        const parent = this.findParent(nodeId);
        if (!parent || parent.type !== 'split') return;

        // Find sibling
        const siblingIndex = parent.children.findIndex(child => child.id !== nodeId);
        if (siblingIndex === -1) return;

        const sibling = parent.children[siblingIndex];

        // Replace parent with sibling
        Object.keys(parent).forEach(key => delete parent[key]);
        Object.assign(parent, sibling);
    }
};

export default layout;
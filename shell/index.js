// shell/index.js
const spc = require('../spc.core/spc.v316');

const shell = {
    version: '1.0.0',
    plugins: new Map(),
    core: new Map(),
    
    registerPlugin: function(name, plugin) {
        if (plugin.execute) {
            this.plugins.set(name, plugin);
            return true;
        }
        return false;
    },
    
    registerCore: function(name, system) {
        if (system.execute) {
            this.core.set(name, system);
            return true;
        }
        return false;
    },
    
    runPlugin: function(name, ...args) {
        const plugin = this.plugins.get(name);
        return plugin ? plugin.execute(...args) : null;
    },
    
    runCore: function(name, ...args) {
        const system = this.core.get(name);
        return system ? system.execute(...args) : null;
    },
    
    listPlugins: function() {
        return Array.from(this.plugins.keys());
    },
    
    listCore: function() {
        return Array.from(this.core.keys());
    },
    
    execute: function() {
        return {
            plugins: this.plugins.size,
            core: this.core.size,
            version: this.version
        };
    }
};

spc.register('shell', shell);
module.exports = shell;

/*
SHELL SYSTEM

Public framework for plugin ecosystem.

STRUCTURE:
- Plugins: User-facing functionality
- Core: Shell infrastructure (operations, loader, bridge)

REGISTRATION:
- Plugins and core systems register separately
- Both require execute() to exist
*/
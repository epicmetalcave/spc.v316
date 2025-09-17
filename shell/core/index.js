// shell/core/index.js
const shell = require('../index');

const core = {
    systems: new Map(),
    
    register: function(name, system) {
        if (system.execute) {
            this.systems.set(name, system);
            shell.registerCore(name, system);
            return true;
        }
        return false;
    },
    
    get: function(name) {
        return this.systems.get(name);
    },
    
    list: function() {
        return Array.from(this.systems.keys());
    },
    
    execute: function() {
        const status = {};
        this.systems.forEach((system, name) => {
            status[name] = system.execute();
        });
        return status;
    }
};

shell.registerCore('core', core);
module.exports = core;

/*
SHELL CORE SYSTEM

Infrastructure for shell framework.

MANAGES:
- operations: Validation and constraints
- loader: Plugin loading
- bridge: Inter-plugin communication
- progressive: Lazy loading extensions
*/
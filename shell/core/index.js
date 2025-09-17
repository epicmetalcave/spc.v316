// shell/core/index.js
const shell = require('../index');

const core = {
    systems: new Map(),
    
    register(name, system) {
        if (system.execute) {
            this.systems.set(name, system);
            shell.registerCore(name, system);
            return true;
        }
        return false;
    },
    
    get(name) {
        return this.systems.get(name);
    },
    
    list() {
        return Array.from(this.systems.keys());
    },
    
    execute() {
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

*/
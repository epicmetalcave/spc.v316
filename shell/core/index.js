// shell/core/index.js
import './operations/index.js';

const core = {
    systems: new Map(),

    register(name, system) {
        if (system.execute) {
            this.systems.set(name, system);
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

export default core;

/*
SHELL CORE SYSTEM

Infrastructure for shell framework.

*/
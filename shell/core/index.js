// shell/core/index.js
import operations from './operations/index.js';
import initOperations from './operations/init.js';

const core = {
    systems: new Map(),
    initialized: false,

    init() {
        if (this.initialized) return;

        // Initialize operations subsystem
        initOperations();
        this.register('operations', operations);

        this.initialized = true;
    },

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
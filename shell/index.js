// shell/index.js
const spc = require('../spc.core/spc.v316');

const shell = {
    version: '1.0.0',
    dashboard: null,
    core: null,
    initialized: false,
    
    init() {
        if (this.initialized) return this.execute();
        
        // Initialize core operations
        this.core = require('./core');
        
        // Initialize dashboard
        const Dashboard = require('./dashboard');
        this.dashboard = new Dashboard();
        this.dashboard.init();
        
        this.initialized = true;
        
        return this.execute();
    },
    
    execute() {
        return {
            version: this.version,
            initialized: this.initialized,
            core: this.core ? true : false,
            dashboard: this.dashboard ? this.dashboard.execute() : null
        };
    }
};

// Register with spc
spc.register('shell', shell);
module.exports = shell;

/*
SHELL SYSTEM

Minimal orchestrator for the shell framework.
*/
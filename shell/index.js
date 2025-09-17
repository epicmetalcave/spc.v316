// shell/index.js
import core from './core/index.js';
import dashboard from './dashboard/index.js';

const shell = {
    async init() {
        // Initialize in order
        core.init();
        dashboard.init();
        
        return this.execute();
    },

    execute() {
        // Return system status
        return {
            core: core.execute(),
            dashboard: dashboard.execute()
        };
    }
};

export default shell;
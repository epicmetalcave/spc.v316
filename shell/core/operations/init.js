// shell/core/operations/init.js
import operations from './index.js';
import performance from './performance/index.js';
import density from './density/index.js';

export function initOperations() {
    operations.register('performance', performance);
    operations.register('density', density);
    return operations;
}

export default initOperations;
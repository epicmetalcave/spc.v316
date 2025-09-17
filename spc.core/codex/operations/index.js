// operations/index.js
const codex = require('../index');

const operations = {
    constraints: new Map(),
    
    register: function(name, constraint) {
        if (constraint.execute && constraint.validate && constraint.enforce) {
            this.constraints.set(name, constraint);
            return true;
        }
        return false;
    },
    
    enforce: function(target) {
        const violations = {};
        this.constraints.forEach((constraint, name) => {
            const result = constraint.enforce(target);
            if (result.failed) {
                violations[name] = result;
            }
        });
        return violations;
    },
    
    measure: function(target) {
        const metrics = {};
        this.constraints.forEach((constraint, name) => {
            metrics[name] = constraint.measure ? constraint.measure(target) : null;
        });
        return metrics;
    },
    
    validate: function(target) {
        const violations = [];
        this.constraints.forEach((constraint) => {
            const result = constraint.validate(target);
            violations.push(...result);
        });
        return violations;
    },
    
    execute: function() {
        const status = {};
        this.constraints.forEach((constraint, name) => {
            status[name] = constraint.execute();
        });
        return status;
    }
};

codex.register('operations', operations);
module.exports = operations;

/*
OPERATIONS SYSTEM

Executable constraints and validation rules.

CONSTRAINTS MUST PROVIDE:
- execute(): Return constraint configuration
- validate(target): Return violations array
- enforce(target): Return pass/fail with details
- measure(target): Optional metrics gathering
*/
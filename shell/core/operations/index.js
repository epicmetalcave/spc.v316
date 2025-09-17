// shell/core/operations/index.js
import core from '../index.js';
import './performance/index.js';
import './density/index.js';

const operations = {
    constraints: new Map(),

    register: function(name, constraint) {
        if (constraint.execute && constraint.validate && constraint.enforce) {
            this.constraints.set(name, constraint);
            return true;
        }
        return false;
    },

    enforce: function(target, name) {
        const violations = {};
        this.constraints.forEach((constraint, constraintName) => {
            const result = constraint.enforce(target, name);
            if (result.failed) {
                violations[constraintName] = result;
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

    list: function() {
        return Array.from(this.constraints.keys());
    },

    execute: function() {
        const status = {};
        this.constraints.forEach((constraint, name) => {
            status[name] = constraint.execute();
        });
        return status;
    }
};

core.register('operations', operations);
export default operations;

/*
SHELL OPERATIONS SYSTEM

Manages shell-specific constraints and validations.
Constraints disclosed in subsystems (density, etc.)

All constraints must provide:
- execute(): Configuration
- validate(): Violations array
- enforce(): Pass/fail with details
*/
// codex/index.js
const spc = require('../spc.v316');

const codex = {
    systems: new Map(),
    
    register: function(name, system) {
        if (system.execute && system.validate) {
            this.systems.set(name, system);
            return true;
        }
        return false;
    },
    
    validate: function(targetName, target) {
        const report = {};
        this.systems.forEach((system, name) => {
            const violations = system.validate(target);
            if (violations && violations.length > 0) {
                report[name] = violations;
            }
        });
        return report;
    },
    
    check: function(targetName) {
        const target = spc.core.get(targetName);
        if (!target) return `Target not found: ${targetName}`;
        return this.validate(targetName, target);
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

spc.register('codex', codex);
module.exports = codex;

/*
CODEX SYSTEM

Registry for philosophical and validation systems.

ROLE:
- Container/coordinator only
- Does NOT define philosophy
- Manages philosophical systems

SYSTEMS MUST PROVIDE:
- execute(): Return system status/config
- validate(target): Return violations array
*/
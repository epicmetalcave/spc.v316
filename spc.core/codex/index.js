// codex/index.js
const spc = require('../spc.v316');

const codex = {
    systems: new Map(),
    types: {
        philosophical: [],
        operational: []
    },
    
    register: function(name, system, type) {
        if (system.execute && system.validate) {
            this.systems.set(name, system);
            if (type && this.types[type]) {
                this.types[type].push(name);
            }
            return true;
        }
        return false;
    },
    
    listByType: function(type) {
        return this.types[type] || [];
    },
    
    // ... existing validate, check functions ...
    
    execute: function() {
        return {
            philosophical: this.types.philosophical,
            operational: this.types.operational,
            total: this.systems.size
        };
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
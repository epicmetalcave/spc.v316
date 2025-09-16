// seeds.js
const spc = require('../../spc.v316');

const seeds = {
    list: [],
    
    add: function(seed) {
        this.list.push({
            name: seed,
            timestamp: Date.now()
        });
        return true;
    },
    
    execute: function() {
        return this.list.map(s => s.name);
    }
};

spc.register('seeds', seeds);
module.exports = seeds;

/*
SEEDS SYSTEM

Tracks ideas not yet implemented as systems.

Seeds are concepts, notes, or ideas that emerged 
in chat but haven't been built yet.
*/
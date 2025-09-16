// tokens.js
const spc = require('../../spc.v316');

const tokens = {
    execute: function(text) {
        if (!text) return 0;
        
        const characters = text.length;
        const estimated = Math.round(characters / 4);
        const percentage = Math.round((estimated / 100000) * 100);
        
        return percentage;
    }
};

spc.register('tokens', tokens);
module.exports = tokens;

/*
TOKENS SYSTEM

Calculates token usage from text.

RETURNS:
- Percent of context used
*/
// commands/token.js
const command = require('../command');
const tokens = require('../systems/utilities/tokens');

const tokenCommand = {
    execute: function(conversation) {
        // In real use, would get actual conversation text
        // For now, return estimate
        const percentage = tokens.execute(conversation || "");
        return `${percentage}%`;
    }
};

command.register('token', tokenCommand);
module.exports = tokenCommand;

/*
TOKEN COMMAND

Slash command for token counting.

USAGE:
/token - Returns percentage of context used
*/
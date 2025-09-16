// commands/handoff.js
const command = require('..');
const handoffs = require('../../systems/utilities/handoffs');

const handoffCommand = {
    execute: function() {
        return handoffs.execute();
    }
};

command.register('handoff', handoffCommand);
module.exports = handoffCommand;

/*
HANDOFF COMMAND

Generates handoff document.

USAGE:
/handoff
*/
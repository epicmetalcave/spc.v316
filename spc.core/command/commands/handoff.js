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

Generates complete handoff document for conversation transfer.

USAGE:
/handoff

OUTPUT:
Returns a module.exports formatted document containing:
- Name and timestamp
- Created systems
- Updates/changes/archived
- Decisions
- Seeds (unimplemented ideas)
- Drafts (partially implemented systems)
*/
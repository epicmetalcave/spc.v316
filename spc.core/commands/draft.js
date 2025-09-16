// commands/draft.js
const command = require('../command');
const drafts = require('../systems/utilities/drafts');

const draftCommand = {
    execute: function(seedName) {
        return drafts.execute(seedName);
    }
};

command.register('draft', draftCommand);
module.exports = draftCommand;

/*
DRAFT COMMAND

Creates draft implementation from seed.

USAGE:
/draft [seed-name]
*/
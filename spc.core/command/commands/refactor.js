// commands/refactor.js
const command = require('../command');
const refactors = require('../systems/utilities/refactors');

const refactorCommand = {
    execute: function(type, target) {
        return refactors.execute(type, target);
    }
};

command.register('refactor', refactorCommand);
module.exports = refactorCommand;

/*
REFACTOR COMMAND

Slash command for refactoring operations.

USAGE:
/refactor move index - Move parent files to index.js pattern
/refactor rename [target] - Future: rename systems
/refactor extract [target] - Future: extract functions
*/
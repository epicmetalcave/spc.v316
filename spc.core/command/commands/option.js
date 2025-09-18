// commands/option.js
const command = require('..');

const optionCommand = {
    execute: function(feature) {
        if (!feature) {
            return 'Usage: /option [feature]';
        }
        
        return `OPTIONS REQUEST: ${feature}
Generate architectural approaches with trade-offs.`;
    }
};

command.register('option', optionCommand);
module.exports = optionCommand;

/*
OPTION COMMAND

Triggers architectural option generation.
Does not contain options - prompts their creation.

USAGE:
/option panel-system

RESULT:
Prompts generation of 2-3 approaches with pros/cons
*/
// commands/seed.js
const command = require('..');

const seedCommand = {
    execute: function() {
        return [
            'timer plugin - Intervals/blocks/folders for shell',
            'workout plugin - Uses timers, tracks exercises', 
            'plugin bridges - Cross-plugin consumption pattern',
            'shell infrastructure - Public framework core',
            'file.js - File storage system',
            'MCP bridge - Connect Claude to vault',
            'changelog.js - Track system changes',
            'decisions.js - Document choices made',
            'context.js - Current state snapshot',
            'handoff.js - Aggregator for all above'
        ];
    }
};

command.register('seed', seedCommand);
module.exports = seedCommand;

/*
SEED COMMAND

Returns unimplemented ideas from conversation.

USAGE:
/seed - List all unconverted ideas
*/
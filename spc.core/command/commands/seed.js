// commands/seed.js
const command = require('..');
const memory = require('../../memory');
const handoffs = require('../../systems/utilities/handoffs');

const seedCommand = {
    execute: function() {
        // Try to get from memory first, fall back to handoffs
        let seeds = [];
        let drafts = [];

        // Check if we have handoff data in memory
        const handoffData = memory.get('handoff');
        if (handoffData && typeof handoffData === 'object') {
            seeds = handoffData.seeds || [];
            drafts = handoffData.drafts || [];
        } else {
            // Fall back to getting directly from handoffs
            seeds = handoffs.getSeeds();
            drafts = handoffs.getDrafts();
        }

        // Format the output
        let output = 'SEEDS:\n';
        if (seeds.length > 0) {
            seeds.forEach((seed, i) => {
                if (typeof seed === 'string') {
                    output += `  ${i + 1}. ${seed}\n`;
                } else {
                    output += `  ${i + 1}. ${seed.name} - ${seed.context || ''}\n`;
                }
            });
        } else {
            output += '  (none)\n';
        }

        output += '\nDRAFTS:\n';
        if (drafts.length > 0) {
            drafts.forEach((draft, i) => {
                if (typeof draft === 'string') {
                    output += `  ${i + 1}. ${draft}\n`;
                } else {
                    output += `  ${i + 1}. ${draft.name} - ${draft.context || ''} ${draft.status ? `[${draft.status}]` : ''}\n`;
                }
            });
        } else {
            output += '  (none)\n';
        }

        return output;
    }
};

command.register('seed', seedCommand);
module.exports = seedCommand;

/*
SEED COMMAND

Returns seeds (unimplemented ideas) and drafts (partial implementations)
from handoff data or memory.

USAGE:
/seed - List all seeds and drafts

OUTPUT:
- SEEDS: Ideas not yet implemented
- DRAFTS: Systems partially implemented or in draft state
*/
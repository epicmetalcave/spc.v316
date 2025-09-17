// seeds.js
const spc = require('../../spc.v316');
const memory = require('../../memory');
const handoffs = require('./handoffs');

const seeds = {
    execute: function() {
        // Try to get from memory first, fall back to handoffs
        const handoffData = memory.get('handoff');
        if (handoffData && typeof handoffData === 'object' && handoffData.seeds) {
            return handoffData.seeds;
        }

        // Fall back to getting directly from handoffs
        return handoffs.getSeeds();
    },

    getDrafts: function() {
        // Also provide access to drafts
        const handoffData = memory.get('handoff');
        if (handoffData && typeof handoffData === 'object' && handoffData.drafts) {
            return handoffData.drafts;
        }

        return handoffs.getDrafts();
    }
};

spc.register('seeds', seeds);
module.exports = seeds;

/*
SEEDS SYSTEM

Dynamically extracts seeds and drafts from memory or handoff data.

Seeds are concepts, notes, or ideas that emerged
in chat but haven't been built yet.

Drafts are systems partially implemented or in draft state.

Sources data from:
- memory.get('handoff') if available
- handoffs.getSeeds()/getDrafts() as fallback
*/
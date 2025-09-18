// systems/utilities/handoffs.js
const spc = require('../../spc.v316');
const memory = require('../../memory');

const handoffs = {
    execute: function() {
        return `CLAUDE CODER INSTRUCTIONS
================================
Task: Create handoff archive file with real timestamp

Steps:
1. Get current timestamp using new Date() in Copenhagen timezone
2. Format timestamp as YYMMDD_HHMM where:
   - YY: 2-digit year
   - MM: 2-digit month with leading zero
   - DD: 2-digit day with leading zero
   - HH: 24-hour format hour
   - MM: minutes

3. Gather handoff data by:
   - Check memory.get('created') for new systems
   - Check memory.get('updates') for modified files
   - Check memory.get('decisions') for architectural choices
   - Check memory.get('seeds') for unimplemented ideas
   - Check memory.get('drafts') for partial implementations

4. Create filename: handoff_[timestamp].js

5. Write file with content:
// handoff_[timestamp]
module.exports = {
    name: "handoff_[timestamp]",
    timestamp: new Date().toISOString(),
    copenhagen_time: new Date().toLocaleString("en-US", {timeZone: "Europe/Copenhagen"}),
    
    created: [/* items from memory or empty array */],
    updates: [/* items from memory or empty array */],
    changes: [/* items from memory or empty array */],
    archived: [/* items from memory or empty array */],
    decisions: [/* items from memory or empty array */],
    seeds: [/* items from memory or empty array */],
    drafts: [/* items from memory or empty array */]
}

6. Save to EXISTING directory: archive/processlog/handoff/handoff_[timestamp].js
7. Test file loads: node -e "require('./archive/processlog/handoff/handoff_[timestamp].js')"

IMPORTANT: 
- Use existing path: archive/processlog/handoff/
- Pull actual data from memory or scan filesystem
- Do NOT use placeholder data
`;
    },
    
    getCreated: function() {
        // Pull from memory if available, otherwise empty
        return memory.get('created') || [];
    },
    
    getUpdates: function() {
        // Pull from memory if available, otherwise empty
        return memory.get('updates') || [];
    },
    
    getChanges: function() {
        // Pull from memory if available, otherwise empty
        return memory.get('changes') || [];
    },
    
    getArchived: function() {
        // Pull from memory if available, otherwise empty
        return memory.get('archived') || [];
    },
    
    getDecisions: function() {
        // Pull from memory if available, otherwise empty
        return memory.get('decisions') || [];
    },
    
    getSeeds: function() {
        // Pull from memory if available, otherwise empty
        return memory.get('seeds') || [];
    },

    getDrafts: function() {
        // Pull from memory if available, otherwise empty
        return memory.get('drafts') || [];
    }
};

spc.register('handoffs', handoffs);
module.exports = handoffs;

/*
HANDOFFS SYSTEM

Generic handoff generator - pulls data from memory or filesystem.
Does NOT contain hardcoded conversation data.

PATH: archive/processlog/handoff/
FORMAT: handoff_YYMMDD_HHMM.js

Data sources:
- memory system for conversation state
- filesystem scanning for actual files
- NOT hardcoded in this file
*/
// commands/update.js
const command = require('..');

const updateCommand = {
    execute: function(systemName, changes) {
        if (!systemName) {
            return 'Usage: /update [system-name] [changes]';
        }
        
        // Generate Claude Coder instructions
        const instructions = {
            task: `Update ${systemName}`,
            files: [`spc.core/${systemName}.js`],
            changes: changes || 'Review and update as needed',
            steps: [
                `1. Open spc.core/${systemName}.js`,
                '2. Review current implementation',
                '3. Apply specified changes',
                '4. Verify syntax',
                '5. Test execute function'
            ]
        };
        
        return formatForCoder(instructions);
    }
};

function formatForCoder(inst) {
    return `
CLAUDE CODER UPDATE INSTRUCTIONS
=================================
Task: ${inst.task}
Files: ${inst.files.join(', ')}

Changes Required:
${inst.changes}

Steps:
${inst.steps.join('\n')}

Validation:
- Ensure execute() function exists
- Verify module.exports
- Check require() paths
- Test with: node -e "require('./${inst.files[0]}').execute()"
`;
}

command.register('update', updateCommand);
module.exports = updateCommand;

/*
UPDATE COMMAND

Generates Claude Coder instructions for updating systems.

WORKFLOW:
1. User runs: /update [system] [changes]
2. Command generates Coder instructions
3. User pastes to Claude Coder
4. Coder creates plan
5. User reviews and approves

EXAMPLES:
/update memory "Add delete function"
/update command "Add help text"
/update spc.core "Fix data.js reference"
*/
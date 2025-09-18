// commands/debugfix.js
const command = require('..');

const debugfixCommand = {
    execute: function(context) {
        if (!context) {
            return 'Usage: /debugfix [error context or file]';
        }
        
        return `CLAUDE CODER DEBUG INSTRUCTIONS
================================
Task: Debug and fix ${context}

Files to check:
- Identify files mentioned in error
- Check imports and exports
- Verify file dependencies

Issues to investigate:
1. Syntax errors (red indicators in VS Code)
2. Console errors (check browser/node output)
3. Import/export mismatches
4. Missing methods or properties
5. Duplicate declarations

Steps:
1. Parse error messages for line numbers
2. Check for missing exports
3. Verify all required methods exist
4. Match imports to actual exports
5. Look for duplicate code
6. Ensure proper brace/bracket matching

Test by:
1. Clear browser cache
2. Restart server
3. Check console for errors
4. Verify expected behavior

Expected result:
- No syntax errors
- Clean console
- Feature works as intended`;
    }
};

command.register('debugfix', debugfixCommand);
module.exports = debugfixCommand;

/*
DEBUGFIX COMMAND

Generates Claude Coder debug instructions.

USAGE:
/debugfix "dashboard syntax errors"
/debugfix "panel not rendering"

OUTPUT:
Structured debugging instructions for Claude Coder
*/
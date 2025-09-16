// systems/utilities/refactors.js
const spc = require('../../spc.v316');

const refactors = {
    execute: function(type, target) {
        if (!type) return 'Usage: /refactor [move|rename|extract] [target]';
        
        const refactorTypes = {
            move: this.generateMove,
            rename: this.generateRename,
            extract: this.generateExtract
        };
        
        const generator = refactorTypes[type];
        return generator ? generator.call(this, target) : `Unknown refactor: ${type}`;
    },
    
    generateMove: function(target) {
        if (target === 'index') {
            return this.generateIndexRefactor();
        }
        return 'Specify: /refactor move index';
    },
    
    generateIndexRefactor: function() {
        const moves = [
            { from: 'spc.core/command.js', to: 'spc.core/command/index.js' },
            { from: 'spc.core/memory.js', to: 'spc.core/memory/index.js' },
            { from: 'spc.core/spc.core.js', to: 'spc.core/core/index.js' }
        ];
        
        const requires = [
            { file: 'spc.core/command/commands/*.js', update: '../../command' },
            { file: 'spc.core/systems/utilities/*.js', update: '../../command' },
            { file: 'spc.core/systems/utilities/*.js', update: '../../memory' }
        ];
        
        return formatRefactorPlan(moves, requires);
    },
    
    generateRename: function(target) {
        return `Rename refactor for: ${target} - Not yet implemented`;
    },
    
    generateExtract: function(target) {
        return `Extract refactor for: ${target} - Not yet implemented`;
    }
};

function formatRefactorPlan(moves, requires) {
    return `
CLAUDE CODER REFACTOR INSTRUCTIONS
===================================
Task: Move parent files to index.js pattern

MOVES:
${moves.map(m => `- ${m.from} → ${m.to}`).join('\n')}

PATH UPDATES NEEDED:
${requires.map(r => `- ${r.file}: Update to '${r.update}'`).join('\n')}

EXECUTION PLAN:
1. Create folders if missing:
   - spc.core/command/
   - spc.core/memory/
   - spc.core/core/

2. Move files:
   - mv spc.core/command.js spc.core/command/index.js
   - mv spc.core/memory.js spc.core/memory/index.js
   - mv spc.core/spc.core.js spc.core/core/index.js
   - mv spc.core/commands/ spc.core/command/commands/

3. Update require() paths in moved command files

4. Test each module:
   - node -e "require('./spc.core/command')"
   - node -e "require('./spc.core/memory')"
   - node -e "require('./spc.core/core')"

VALIDATION:
All requires should resolve without error.
All execute() functions should work.
`;
}

spc.register('refactors', refactors);
module.exports = refactors;

/*
REFACTORS SYSTEM

Generates refactoring instructions for Claude Coder.

TYPES:
- move: Relocate files/folders
- rename: Change names (future)
- extract: Pull out functionality (future)

USAGE:
/refactor move index - Generate index.js restructure plan
*/
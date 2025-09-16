// command.js
const spc = require('../spc.v316');

const command = {
    commands: new Map(),
    
    register: function(name, cmd) {
        if (cmd.execute) {
            this.commands.set(name, cmd);
            return true;
        }
        return false;
    },
    
    execute: function(cmdName, ...args) {
        const cmd = this.commands.get(cmdName);
        return cmd ? cmd.execute(...args) : `Command not found: ${cmdName}`;
    },
    
    list: function() {
        return Array.from(this.commands.keys());
    }
};

spc.register('command', command);
module.exports = command;

/*
COMMAND SYSTEM

Routes and executes commands. Commands are subsystems with specific actions.

STRUCTURE:
Commands register here, not directly with SPC.
This keeps the core Map clean and organized.
*/
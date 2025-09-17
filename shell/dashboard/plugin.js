// shell/dashboard/plugin.js
function createPlugin(pluginName) {
    const plugin = document.createElement('div');
    plugin.className = 'panel-plugin';
    plugin.style.flex = '1';
    plugin.style.color = 'var(--text)';
    plugin.textContent = `[${pluginName}]`;
    
    return plugin;
}

export default createPlugin;
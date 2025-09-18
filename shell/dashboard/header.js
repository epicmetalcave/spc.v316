// shell/dashboard/header.js
import createActions from './actions.js';

function createHeader(pluginName, panelId) {
    const header = document.createElement('div');
    header.className = 'panel-header';
    header.style.paddingBottom = '4px';  // Reduced from 5px
    header.style.marginBottom = '8px';   // Reduced from 10px
    header.style.borderBottom = '1px solid var(--ui)';
    header.style.color = 'var(--text)';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    
    // TODO: Click header for modal view
    // header.onclick = () => openModal(pluginName);
    
    // Title
    const title = document.createElement('span');
    title.textContent = pluginName;
    
    // Actions
    const actions = createActions(panelId);
    
    header.appendChild(title);
    header.appendChild(actions);
    
    return header;
}

export default createHeader;
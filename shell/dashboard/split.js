// shell/dashboard/split.js
import Panel from './panel.js';

function splitPanel(panel, edge) {
    const container = panel.parentElement;
    const currentWidth = panel.offsetWidth;
    const currentHeight = panel.offsetHeight;
    const currentLeft = panel.offsetLeft;
    const currentTop = panel.offsetTop;
    
    // Create new panel
    const newPanel = new Panel(`${panel.id}-split-${Date.now()}`);
    
    switch(edge) {
        case 'right':
            // Split vertically - new panel on right
            const halfWidthR = Math.floor(currentWidth / 2);
            panel.style.width = halfWidthR + 'px';
            panel.style.right = 'auto';
            
            newPanel.element.style.left = (currentLeft + halfWidthR) + 'px';
            newPanel.element.style.top = currentTop + 'px';
            newPanel.element.style.width = (currentWidth - halfWidthR) + 'px';
            newPanel.element.style.height = currentHeight + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
            
        case 'left':
            // Split vertically - new panel on left
            const halfWidthL = Math.floor(currentWidth / 2);
            panel.style.left = (currentLeft + halfWidthL) + 'px';
            panel.style.width = (currentWidth - halfWidthL) + 'px';
            panel.style.right = 'auto';
            
            newPanel.element.style.left = currentLeft + 'px';
            newPanel.element.style.top = currentTop + 'px';
            newPanel.element.style.width = halfWidthL + 'px';
            newPanel.element.style.height = currentHeight + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
            
        case 'bottom':
            // Split horizontally - new panel below
            const halfHeightB = Math.floor(currentHeight / 2);
            panel.style.height = halfHeightB + 'px';
            panel.style.bottom = 'auto';
            
            newPanel.element.style.left = currentLeft + 'px';
            newPanel.element.style.top = (currentTop + halfHeightB) + 'px';
            newPanel.element.style.width = currentWidth + 'px';
            newPanel.element.style.height = (currentHeight - halfHeightB) + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
            
        case 'top':
            // Split horizontally - new panel above
            const halfHeightT = Math.floor(currentHeight / 2);
            panel.style.top = (currentTop + halfHeightT) + 'px';
            panel.style.height = (currentHeight - halfHeightT) + 'px';
            panel.style.bottom = 'auto';
            
            newPanel.element.style.left = currentLeft + 'px';
            newPanel.element.style.top = currentTop + 'px';
            newPanel.element.style.width = currentWidth + 'px';
            newPanel.element.style.height = halfHeightT + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
    }
    
    // Add new panel to container
    container.appendChild(newPanel.element);
    
    return newPanel;
}

export default splitPanel;
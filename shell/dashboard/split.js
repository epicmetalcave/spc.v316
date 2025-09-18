// shell/dashboard/split.js
import Panel from './panel.js';

function splitPanel(panel, edge, percentage = 0.5) {
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
            const splitWidthR = Math.floor(currentWidth * (1 - percentage));
            panel.style.width = splitWidthR + 'px';
            panel.style.right = 'auto';
            
            newPanel.element.style.left = (currentLeft + splitWidthR) + 'px';
            newPanel.element.style.top = currentTop + 'px';
            newPanel.element.style.width = (currentWidth - splitWidthR) + 'px';
            newPanel.element.style.height = currentHeight + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
            
        case 'left':
            // Split vertically - new panel on left
            const splitWidthL = Math.floor(currentWidth * percentage);
            panel.style.left = (currentLeft + splitWidthL) + 'px';
            panel.style.width = (currentWidth - splitWidthL) + 'px';
            panel.style.right = 'auto';
            
            newPanel.element.style.left = currentLeft + 'px';
            newPanel.element.style.top = currentTop + 'px';
            newPanel.element.style.width = splitWidthL + 'px';
            newPanel.element.style.height = currentHeight + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
            
        case 'bottom':
            // Split horizontally - new panel below
            const splitHeightB = Math.floor(currentHeight * (1 - percentage));
            panel.style.height = splitHeightB + 'px';
            panel.style.bottom = 'auto';
            
            newPanel.element.style.left = currentLeft + 'px';
            newPanel.element.style.top = (currentTop + splitHeightB) + 'px';
            newPanel.element.style.width = currentWidth + 'px';
            newPanel.element.style.height = (currentHeight - splitHeightB) + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
            
        case 'top':
            // Split horizontally - new panel above
            const splitHeightT = Math.floor(currentHeight * percentage);
            panel.style.top = (currentTop + splitHeightT) + 'px';
            panel.style.height = (currentHeight - splitHeightT) + 'px';
            panel.style.bottom = 'auto';
            
            newPanel.element.style.left = currentLeft + 'px';
            newPanel.element.style.top = currentTop + 'px';
            newPanel.element.style.width = currentWidth + 'px';
            newPanel.element.style.height = splitHeightT + 'px';
            newPanel.element.style.right = 'auto';
            newPanel.element.style.bottom = 'auto';
            break;
    }
    
    // Add new panel to container
    container.appendChild(newPanel.element);
    
    return newPanel;
}

export default splitPanel;
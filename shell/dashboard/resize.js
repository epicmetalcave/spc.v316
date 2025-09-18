// shell/dashboard/resize.js
function initResize(panel) {
    // Reserved for future resize constraints/validation
}

export async function resizePanel(panel, edge, amount = 0.05, balance = false) {
    const container = panel.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Get current dimensions
    const currentWidth = panel.offsetWidth;
    const currentHeight = panel.offsetHeight;
    const currentLeft = panel.offsetLeft;
    const currentTop = panel.offsetTop;
    
    // Find all panels
    const panels = Array.from(container.querySelectorAll('.panel')).filter(p => p !== panel);
    
    // Find adjacent panel
    const adjacentPanel = findAdjacentPanel(panels, edge, currentLeft, currentTop, currentWidth, currentHeight);
    
    if (!adjacentPanel) {
        // No adjacent panel - create new one if clicking toward empty space
        if (amount === 0.05) { // Single click only
            const dashboard = document.getElementById('dashboard');
            const splitPanel = await import('./split.js').then(m => m.default);
            const newPanel = splitPanel(panel, edge, amount);
            dashboard.dispatchEvent(new CustomEvent('panel-created', { detail: newPanel }));
        }
        return;
    }
    
    if (balance) {
        // Balance mode - make both panels equal size
        balancePanelsEqual(panel, adjacentPanel, edge);
    } else {
        // Incremental resize
        incrementalResize(panel, adjacentPanel, edge, amount, containerWidth, containerHeight);
    }
}

function balancePanelsEqual(panel, adjacentPanel, edge) {
    switch(edge) {
        case 'left':
        case 'right':
            // Vertical split - balance widths
            const totalWidth = panel.offsetWidth + adjacentPanel.offsetWidth;
            const halfWidth = Math.floor(totalWidth / 2);
            
            if (adjacentPanel.offsetLeft < panel.offsetLeft) {
                // Adjacent is on left
                adjacentPanel.style.width = halfWidth + 'px';
                panel.style.left = (adjacentPanel.offsetLeft + halfWidth) + 'px';
                panel.style.width = (totalWidth - halfWidth) + 'px';
            } else {
                // Adjacent is on right
                panel.style.width = halfWidth + 'px';
                adjacentPanel.style.left = (panel.offsetLeft + halfWidth) + 'px';
                adjacentPanel.style.width = (totalWidth - halfWidth) + 'px';
            }
            break;
            
        case 'top':
        case 'bottom':
            // Horizontal split - balance heights
            const totalHeight = panel.offsetHeight + adjacentPanel.offsetHeight;
            const halfHeight = Math.floor(totalHeight / 2);
            
            if (adjacentPanel.offsetTop < panel.offsetTop) {
                // Adjacent is above
                adjacentPanel.style.height = halfHeight + 'px';
                panel.style.top = (adjacentPanel.offsetTop + halfHeight) + 'px';
                panel.style.height = (totalHeight - halfHeight) + 'px';
            } else {
                // Adjacent is below
                panel.style.height = halfHeight + 'px';
                adjacentPanel.style.top = (panel.offsetTop + halfHeight) + 'px';
                adjacentPanel.style.height = (totalHeight - halfHeight) + 'px';
            }
            break;
    }
}

function incrementalResize(panel, adjacentPanel, edge, amount, containerWidth, containerHeight) {
    const minSize = 50;
    
    switch(edge) {
        case 'left':
            const stepXL = Math.floor(containerWidth * amount);
            const actualStepL = Math.min(stepXL, panel.offsetWidth - minSize);
            
            // Shrink current panel from left
            panel.style.left = (panel.offsetLeft + actualStepL) + 'px';
            panel.style.width = (panel.offsetWidth - actualStepL) + 'px';
            
            // Expand adjacent panel
            adjacentPanel.style.width = (adjacentPanel.offsetWidth + actualStepL) + 'px';
            break;
            
        case 'right':
            const stepXR = Math.floor(containerWidth * amount);
            const actualStepR = Math.min(stepXR, panel.offsetWidth - minSize);
            
            // Shrink current panel from right
            panel.style.width = (panel.offsetWidth - actualStepR) + 'px';
            
            // Expand adjacent panel
            adjacentPanel.style.left = (adjacentPanel.offsetLeft - actualStepR) + 'px';
            adjacentPanel.style.width = (adjacentPanel.offsetWidth + actualStepR) + 'px';
            break;
            
        case 'top':
            const stepYT = Math.floor(containerHeight * amount);
            const actualStepT = Math.min(stepYT, panel.offsetHeight - minSize);
            
            // Shrink current panel from top
            panel.style.top = (panel.offsetTop + actualStepT) + 'px';
            panel.style.height = (panel.offsetHeight - actualStepT) + 'px';
            
            // Expand adjacent panel
            adjacentPanel.style.height = (adjacentPanel.offsetHeight + actualStepT) + 'px';
            break;
            
        case 'bottom':
            const stepYB = Math.floor(containerHeight * amount);
            const actualStepB = Math.min(stepYB, panel.offsetHeight - minSize);
            
            // Shrink current panel from bottom
            panel.style.height = (panel.offsetHeight - actualStepB) + 'px';
            
            // Expand adjacent panel
            adjacentPanel.style.top = (adjacentPanel.offsetTop - actualStepB) + 'px';
            adjacentPanel.style.height = (adjacentPanel.offsetHeight + actualStepB) + 'px';
            break;
    }
}

function findAdjacentPanel(panels, side, x, y, width, height) {
    const threshold = 2; // Allow 2px tolerance for borders
    
    for (let panel of panels) {
        const pLeft = panel.offsetLeft;
        const pTop = panel.offsetTop;
        const pRight = pLeft + panel.offsetWidth;
        const pBottom = pTop + panel.offsetHeight;
        
        switch(side) {
            case 'left':
                // Panel to the left: its right edge touches x
                if (Math.abs(pRight - x) <= threshold && 
                    pTop < y + height && pBottom > y) {
                    return panel;
                }
                break;
                
            case 'right':
                // Panel to the right: its left edge touches x + width
                if (Math.abs(pLeft - (x + width)) <= threshold && 
                    pTop < y + height && pBottom > y) {
                    return panel;
                }
                break;
                
            case 'top':
                // Panel above: its bottom edge touches y
                if (Math.abs(pBottom - y) <= threshold && 
                    pLeft < x + width && pRight > x) {
                    return panel;
                }
                break;
                
            case 'bottom':
                // Panel below: its top edge touches y + height
                if (Math.abs(pTop - (y + height)) <= threshold && 
                    pLeft < x + width && pRight > x) {
                    return panel;
                }
                break;
        }
    }
    
    return null;
}

export default initResize;
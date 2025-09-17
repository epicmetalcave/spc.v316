// shell/dashboard/resize.js
function initResize(panel) {
    // Empty for now - resize is handled by panel arrows
    // This file can be used for resize constraints/validation
}

export function resizePanel(panel, edge, amount = 0.05) {
    const container = panel.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Calculate 5% of container dimensions
    const stepX = Math.floor(containerWidth * amount);
    const stepY = Math.floor(containerHeight * amount);
    
    // Get current dimensions
    const currentWidth = panel.offsetWidth;
    const currentHeight = panel.offsetHeight;
    const currentLeft = panel.offsetLeft;
    const currentTop = panel.offsetTop;
    
    // Check if panel is at screen edge
    const atLeftEdge = currentLeft === 0;
    const atRightEdge = (currentLeft + currentWidth) >= containerWidth - 2;
    const atTopEdge = currentTop === 0;
    const atBottomEdge = (currentTop + currentHeight) >= containerHeight - 2;
    
    const minSize = 50;
    
    // Find all panels
    const panels = Array.from(container.querySelectorAll('.panel')).filter(p => p !== panel);
    
    switch(edge) {
        case 'left':
            // Shrink from left - panel moves right and gets smaller
            if (!atLeftEdge && currentWidth > minSize) {
                const actualStep = Math.min(stepX, currentWidth - minSize);
                
                // Find panel to the left that should expand
                const leftPanel = findAdjacentPanel(panels, 'left', currentLeft, currentTop, currentHeight);
                if (leftPanel) {
                    // Expand left panel
                    leftPanel.style.width = (leftPanel.offsetWidth + actualStep) + 'px';
                    leftPanel.style.right = 'auto';
                    
                    // Shrink current panel
                    panel.style.left = (currentLeft + actualStep) + 'px';
                    panel.style.width = (currentWidth - actualStep) + 'px';
                    panel.style.right = 'auto';
                }
            }
            break;
            
        case 'right':
            // Shrink from right
            if (!atRightEdge && currentWidth > minSize) {
                const actualStep = Math.min(stepX, currentWidth - minSize);
                
                // Find panel to the right that should expand
                const rightPanel = findAdjacentPanel(panels, 'right', currentLeft + currentWidth, currentTop, currentHeight);
                if (rightPanel) {
                    // Shrink current panel
                    panel.style.width = (currentWidth - actualStep) + 'px';
                    panel.style.right = 'auto';
                    
                    // Expand right panel
                    rightPanel.style.left = (rightPanel.offsetLeft - actualStep) + 'px';
                    rightPanel.style.width = (rightPanel.offsetWidth + actualStep) + 'px';
                    rightPanel.style.right = 'auto';
                }
            }
            break;
            
        case 'top':
            // Shrink from top - panel moves down and gets smaller
            if (!atTopEdge && currentHeight > minSize) {
                const actualStep = Math.min(stepY, currentHeight - minSize);
                
                // Find panel above that should expand
                const topPanel = findAdjacentPanel(panels, 'top', currentLeft, currentTop, currentWidth);
                if (topPanel) {
                    // Expand top panel
                    topPanel.style.height = (topPanel.offsetHeight + actualStep) + 'px';
                    topPanel.style.bottom = 'auto';
                    
                    // Shrink current panel
                    panel.style.top = (currentTop + actualStep) + 'px';
                    panel.style.height = (currentHeight - actualStep) + 'px';
                    panel.style.bottom = 'auto';
                }
            }
            break;
            
        case 'bottom':
            // Shrink from bottom
            if (!atBottomEdge && currentHeight > minSize) {
                const actualStep = Math.min(stepY, currentHeight - minSize);
                
                // Find panel below that should expand
                const bottomPanel = findAdjacentPanel(panels, 'bottom', currentLeft, currentTop + currentHeight, currentWidth);
                if (bottomPanel) {
                    // Shrink current panel
                    panel.style.height = (currentHeight - actualStep) + 'px';
                    panel.style.bottom = 'auto';
                    
                    // Expand bottom panel
                    bottomPanel.style.top = (bottomPanel.offsetTop - actualStep) + 'px';
                    bottomPanel.style.height = (bottomPanel.offsetHeight + actualStep) + 'px';
                    bottomPanel.style.bottom = 'auto';
                }
            }
            break;
    }
}

function findAdjacentPanel(panels, side, x, y, size) {
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
                    pTop < y + size && pBottom > y) {
                    return panel;
                }
                break;
                
            case 'right':
                // Panel to the right: its left edge touches x
                if (Math.abs(pLeft - x) <= threshold && 
                    pTop < y + size && pBottom > y) {
                    return panel;
                }
                break;
                
            case 'top':
                // Panel above: its bottom edge touches y
                if (Math.abs(pBottom - y) <= threshold && 
                    pLeft < x + size && pRight > x) {
                    return panel;
                }
                break;
                
            case 'bottom':
                // Panel below: its top edge touches y
                if (Math.abs(pTop - y) <= threshold && 
                    pLeft < x + size && pRight > x) {
                    return panel;
                }
                break;
        }
    }
    
    return null;
}

export default initResize;
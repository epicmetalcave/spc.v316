// shell/dashboard/actions.js
function createActions(panelId) {
    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';
    actions.style.alignItems = 'center';
    
    // Clear button (square)
    const clearBtn = document.createElement('button');
    clearBtn.innerHTML = '&#9633;';
    clearBtn.style.background = 'none';
    clearBtn.style.border = 'none';
    clearBtn.style.color = 'var(--ui)';
    clearBtn.style.cursor = 'pointer';
    clearBtn.style.fontSize = '18px';
    clearBtn.style.padding = '0';
    clearBtn.style.lineHeight = '1';
    clearBtn.style.display = 'flex';
    clearBtn.style.alignItems = 'center';
    clearBtn.onclick = () => console.log('Clear panel', panelId);
    
    // Delete button (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.style.background = 'none';
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = 'var(--ui)';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.fontSize = '18px';
    deleteBtn.style.padding = '0';
    deleteBtn.style.lineHeight = '1';
    deleteBtn.style.display = 'flex';
    deleteBtn.style.alignItems = 'center';
    deleteBtn.onclick = () => console.log('Delete panel', panelId);
    
    actions.appendChild(clearBtn);
    actions.appendChild(deleteBtn);
    
    return actions;
}

export default createActions;
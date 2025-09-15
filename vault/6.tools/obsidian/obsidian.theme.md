---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[obsidian.theme]]"
SUPER:
TYPE: configuration
DEPENDENCY:
  - "[[obsidian.vault]]"
  - "[[obsidian.font]]"
CONSUME:
SEED:
OBJECTIVE: Configure minimal dark theme with bright green UI elements and true black background
FUNCTION: Override Obsidian theme colors via CSS snippets for high-contrast terminal aesthetic
OPERATION: Apply CSS variables to transform any base theme into green-on-black color scheme
SPEC-INDEX: [Design-Principles, Color-Palette, CSS-Implementation, Installation, Customization]
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[obsidian.theme]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[obsidian.theme]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[obsidian.theme]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Configure minimal dark theme with bright green UI elements and true black background
FUNCTION: Override Obsidian theme colors via CSS snippets for high-contrast terminal aesthetic
OPERATION: Apply CSS variables to transform any base theme into green-on-black color scheme
SPEC-INDEX: [Design-Principles, Color-Palette, CSS-Implementation, Installation, Customization]

### SPEC-DOC

#### Design-Principles
- True black background (#000000) for maximum contrast
- Bright green (#00ff00) for all text and UI elements
- Terminal/matrix aesthetic
- Minimal visual noise
- High readability in dark environments
- Based on existing Minimal theme structure

#### Color-Palette
```css
/* Core colors */
--true-black: #000000;
--bright-green: #00ff00;
--dim-green: #00cc00;
--dark-green: #009900;
--faint-green: #004400;
```

#### CSS-Implementation
Create file: `vault/.obsidian/snippets/green-terminal-theme.css`
```css
/* Green Terminal Theme for Obsidian */
.theme-dark {
  /* Backgrounds */
  --background-primary: #000000;
  --background-primary-alt: #000000;
  --background-secondary: #000000;
  --background-secondary-alt: #000000;
  --background-modifier-border: #00ff00;
  --background-modifier-box-shadow: rgba(0, 255, 0, 0.1);
  --background-modifier-success: #00ff00;
  --background-modifier-error: #00ff00;
  --background-modifier-cover: rgba(0, 0, 0, 0.8);

  /* Text Colors */
  --text-normal: #00ff00;
  --text-muted: #00cc00;
  --text-faint: #009900;
  --text-error: #00ff00;
  --text-success: #00ff00;
  --text-warning: #00ff00;
  --text-highlight-bg: #004400;
  --text-selection: rgba(0, 255, 0, 0.2);

  /* Interactive Elements */
  --interactive-normal: #000000;
  --interactive-hover: #001100;
  --interactive-accent: #00ff00;
  --interactive-accent-rgb: 0, 255, 0;
  --interactive-accent-hover: #00cc00;

  /* Links */
  --link-color: #00ff00;
  --link-color-hover: #00cc00;
  --link-external-color: #00ff00;

  /* Code */
  --code-background: #001100;
  --code-normal: #00ff00;

  /* Headers */
  --h1-color: #00ff00;
  --h2-color: #00ff00;
  --h3-color: #00ff00;
  --h4-color: #00ff00;
  --h5-color: #00ff00;
  --h6-color: #00ff00;

  /* Scrollbars */
  --scrollbar-bg: #000000;
  --scrollbar-thumb-bg: #004400;
  --scrollbar-active-thumb-bg: #00ff00;
}

/* Remove all shadows and borders except green ones */
* {
  box-shadow: none !important;
}

.workspace-split.mod-root {
  background-color: #000000;
}

/* Green borders for panes */
.workspace-leaf {
  border: 1px solid #004400;
}

/* Cursor in editor */
.cm-cursor {
  border-left-color: #00ff00 !important;
}
```

#### Installation
1. Ensure Minimal theme is installed (optional base)
2. Create CSS snippet file as specified above
3. Place in `vault/.obsidian/snippets/`
4. Enable in Settings → Appearance → CSS snippets
5. Toggle both Share Tech Mono and Green Terminal Theme

#### Customization
Adjust green brightness:
- Brighter: Change #00ff00 to #00ff00 (already maximum)
- Dimmer: Change #00ff00 to #00dd00 or #00bb00
- Matrix-style: Add slight blue tint #00ff33

Add glow effect:
```css
.cm-cursor, .text-normal {
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}
```
---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[obsidian.font]]"
SUPER:
TYPE: configuration
DEPENDENCY:
  - "[[obsidian.vault]]"
CONSUME:
SEED:
OBJECTIVE: Install and configure Share Tech Mono custom font in Obsidian vault
FUNCTION: Add custom font via CSS snippets for consistent typography across vault
OPERATION: Import font files or link CDN, create CSS snippet, enable in Obsidian
SPEC-INDEX: [Installation-Methods, Configuration, CSS-Snippet, Activation, Troubleshooting]
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[obsidian.font]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[obsidian.font]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[obsidian.font]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Install and configure Share Tech Mono custom font in Obsidian vault
FUNCTION: Add custom font via CSS snippets for consistent typography across vault
OPERATION: Import font files or link CDN, create CSS snippet, enable in Obsidian
SPEC-INDEX: [Installation-Methods, Configuration, CSS-Snippet, Activation, Troubleshooting]

### SPEC-DOC

#### Installation-Methods
**Method 1: Google Fonts CDN (Requires internet)**
```css
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
```

**Method 2: Local font files (Offline)**
1. Download from: https://fonts.google.com/specimen/Share+Tech+Mono
2. Create folder: `vault/.obsidian/fonts/`
3. Place `ShareTechMono-Regular.ttf` in fonts folder
4. Reference locally in CSS

#### Configuration
Font variables in Obsidian:
- `--font-text-theme`: Reading/editor font
- `--font-interface-theme`: UI elements font
- `--font-monospace-theme`: Code blocks font

#### CSS-Snippet
Create file: `vault/.obsidian/snippets/share-tech-mono.css`
```css
/* Import Share Tech Mono */
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

/* Apply to entire vault */
.theme-light, .theme-dark {
  --font-text-theme: 'Share Tech Mono', monospace;
  --font-interface-theme: 'Share Tech Mono', monospace;
  --font-monospace-theme: 'Share Tech Mono', monospace;
}

/* Optional: Specific application */
.markdown-source-view {
  font-family: 'Share Tech Mono', monospace !important;
}

.markdown-preview-view {
  font-family: 'Share Tech Mono', monospace !important;
}
```

#### Activation
1. Navigate to Settings → Appearance → CSS snippets
2. Click folder icon to open snippets folder
3. Place `share-tech-mono.css` file
4. Return to Obsidian
5. Click reload button in CSS snippets
6. Toggle on `share-tech-mono`

#### Troubleshooting
- **Font not loading**: Check internet connection for CDN method
- **Font looks wrong**: Clear cache and reload Obsidian
- **Partial application**: Add `!important` to CSS rules
- **Performance issues**: Use local files instead of CDN
- **Fallback fonts**: System will use `monospace` if Share Tech Mono fails
---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[sync.update]]"
SUPER:
  - "[[00_spc]]"
TYPE: command
DEPENDENCY:
CONSUMES:
  - "[[github.repository]]"
  - "[[claude.context]]"
SEED:
OBJECTIVE: Search conversation for modified LIVE systems and generate Claude Coder UPDATE instructions
SPEC-DOC: The sync.update command searches the current conversation for all systems marked as LIVE, checks GitHub repository for existing files that have been modified, and generates a formatted artifact with Claude Coder instructions to update only CHANGED files that exist in the repository.
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[sync.update]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync.update]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync.update]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Search conversation for modified LIVE systems and generate Claude Coder UPDATE instructions

SPEC-DOC:
The sync.update command searches the current conversation for all systems marked as LIVE, checks GitHub repository for existing files that have been modified, and generates a formatted artifact with Claude Coder instructions to update only CHANGED files that exist in the repository.

Command: /sync.update

Process:
- Search entire conversation for systems with STATE: LIVE
- Check GitHub repository for existing files
- Compare conversation version with repository version
- Filter to only systems that EXIST in repo AND have changes
- Extract latest version of each modified LIVE system
- Generate artifact titled "/sync.update - Claude Coder Instructions"
- Format as UPDATE instructions for Claude Coder
- Include full markdown content with YAML front matter
- Show what changed (version bump, content changes)
- New files are skipped (use sync.create)

Output Format:
```
# CLAUDE CODER SYNC INSTRUCTIONS
Working Directory: emill@TOWER:~/spc/vault$

**IMPORTANT:** Update files in their current locations. Do NOT move files.

## UPDATE FILES
### 1. Update file: `path/to/system.name.md`
[Full updated markdown content]
### 2. Update file: `path/to/another.system.md`
[Full updated markdown content]
## SUMMARY
TOTAL: X files to update
Changes detected in: [list of changed properties/sections]
```

Consumes:
- github.repository: Checks for existing files and compares versions
- claude.context: Accesses conversation history for LIVE systems

Dependencies:
- System.properties schema for YAML structure
- Claude Coder access to vault
- Existing files in repository
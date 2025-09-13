---
SPC:
  - "[[spc.v316]]"
SYSTEM: "[[sync.create]]"
SUPER:
TYPE: command
DEPENDENCY: "[[github.repository]]"
CONSUMES:
SEED:
OBJECTIVE: Search conversation for LIVE systems and generate Claude Coder CREATE instructions for new files only
SPEC-DOC: The sync.create command searches the current conversation for all systems marked as LIVE, checks GitHub repository for existing files, and generates a formatted artifact with Claude Coder instructions to create only NEW files that don't exist in the repository.
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[sync.create]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync.create]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync.create]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Search conversation for LIVE systems and generate Claude Coder CREATE instructions for new files only

SPEC-DOC:
The sync.create command searches the current conversation for all systems marked as LIVE, checks GitHub repository for existing files, and generates a formatted artifact with Claude Coder instructions to create only NEW files that don't exist in the repository.

Command: /sync.create

Process:
- Search entire conversation for systems with STATE: LIVE
- Check GitHub repository for existing files (via API or git status)
- Filter to only systems that DON'T exist in repo
- Extract latest version of each new LIVE system
- Generate artifact titled "/sync.create - Claude Coder Instructions"
- Format as CREATE instructions for Claude Coder
- Include full markdown content with YAML front matter
- Output filenames without folder paths for manual organization
- Systems that exist in repo but differ are skipped (use sync.update)

Output Format:
```
# CLAUDE CODER SYNC INSTRUCTIONS
Working Directory: emill@TOWER:~/spc/vault$
## CREATE FILES
### 1. Create file: `system.name.md`
[Full markdown content]
### 2. Create file: `another.system.md`
[Full markdown content]
## SUMMARY
TOTAL: X files to create
```

Consumes:
- github.repository: Checks for existing files in repo
- claude.context: Accesses conversation history for LIVE systems

Dependencies:
- System.properties schema for YAML structure
- Claude Coder access to vault
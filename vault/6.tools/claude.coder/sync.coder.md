---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[sync.coder]]"
SUPER:
  - "[[00_spc]]"
TYPE: command
DEPENDENCY:
SEED:
OBJECTIVE: Generate Claude Coder instructions for all LIVE state systems that need synchronization
SPEC-DOC: The sync.coder command scans the conversation for systems marked as LIVE and creates formatted instructions for Claude Coder to create or update files in the repository. Only systems ready for deployment are included.
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[sync.coder]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync.coder]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync.coder]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Generate Claude Coder instructions for all LIVE state systems that need synchronization

SPEC-DOC:
The sync.coder command scans the conversation for systems marked as LIVE and creates formatted instructions for Claude Coder to create or update files in the repository. Only systems ready for deployment are included.

Command: /sync.coder

Sync Rules:
- Include only systems in LIVE state
- CREATE for new systems
- UPDATE for version changes
- Skip DRAFT (not ready)
- Skip unchanged systems

Output Format:
```
CLAUDE CODER SYNC INSTRUCTIONS
Working Directory: emill@TOWER:~/spc/vault$
CREATE FILES: [List all new LIVE systems]
UPDATE FILES: [List all LIVE systems with version changes]
TOTAL: X files to create, Y files to update
```

Process:
- Identify all systems with finalized code blocks
- Determine file paths based on system type and name
- Format as CREATE for new files
- Format as UPDATE for version changes
- Include full code block content
- Output as single artifact for paste to Claude Coder

Dependencies:
- Finalized code blocks in conversation
- SPC directory structure
- Claude Coder access to repository
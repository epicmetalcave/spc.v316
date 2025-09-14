---
SPC:
  - "[[spc.v316]]"
SYSTEM: "[[sync.save]]"
SUPER:
TYPE: command
DEPENDENCY:
CONSUME:
  - "[[github.repository]]"
SEED:
OBJECTIVE: Generate code block with git save command for manual terminal execution
SPEC-DOC: The sync.save command generates a code block containing the git commands to save all work. User copies and executes manually in terminal.
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[sync.save]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync.save]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync.save]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Generate code block with git save command for manual terminal execution

SPEC-DOC:
The sync.save command generates a code block containing the git commands to save all work. User copies and executes manually in terminal.

Command: /sync.save

Output:
```bash
git add -A && git commit -m "Save" && git push origin main
```

Process:
- User types /sync.save in conversation
- System outputs code block with git command
- User copies command to terminal
- User executes manually

Consumes:
- github.repository: Repository must exist and credentials configured
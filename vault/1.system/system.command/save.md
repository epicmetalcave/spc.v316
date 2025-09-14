---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[save]]"
SUPER:
  - "[[00_spc]]"
TYPE: command
DEPENDENCY:
CONSUMES:
  - "[[github.repository]]"
SEED:
OBJECTIVE: Execute git add, commit, and push in a single command to save all work
SPEC-DOC: The save command executes git add -A, commit with "Save" message, and push to origin main.
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[save]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[save]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[save]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Execute git add, commit, and push in a single command to save all work

SPEC-DOC:
The save command executes git add -A, commit with "Save" message, and push to origin main.

Command: /save

Execute:
```bash
git add -A && git commit -m "Save" && git push origin main
```

Consumes:
- github.repository: Repository must exist and credentials configured
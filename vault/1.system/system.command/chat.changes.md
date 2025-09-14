---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[chat.changes]]"
SUPER:
TYPE: tracker
DEPENDENCY:
CONSUME:
  - "[[chat.context]]"
SEED:
OBJECTIVE: Track and queue agreed-upon changes from conversation that haven't been implemented yet
FUNCTION: Extract pending updates discussed in conversation for batch application
OPERATION: Review conversation for agreed changes and present actionable update list
SPEC-INDEX: [Purpose, Process, Output, Command, Current-Queue]
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[chat.changes]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[chat.changes]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[chat.changes]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Track and queue agreed-upon changes from conversation that haven't been implemented yet
FUNCTION: Extract pending updates discussed in conversation for batch application
OPERATION: Review conversation for agreed changes and present actionable update list
SPEC-INDEX: [Purpose, Process, Output, Command, Current-Queue]

### SPEC-DOC

#### Purpose
- Track agreed changes that need implementation
- Different from seeds (undefined concepts)
- Staging area for updates before sync.update
- Prevent loss of discussed modifications
- Enable batch application of changes

#### Process
1. Continuously track agreed changes during conversation
2. User runs /changes command
3. System presents numbered list of pending changes
4. User approves specific items or ALL
5. Approved changes feed into sync.update
6. Clear completed items from queue

#### Output
Format for pending changes:
```
PENDING CHANGES from conversation:

1. ✓ [Change description]
   Files affected: [list]
   Status: [Ready/Partial/Blocked]

2. ✓ [Another change]
   Details: [specifics]

Select changes to apply: [1,2] or ALL
```

#### Command
Execute change tracking:
- **/changes** - Display all pending changes from conversation
- Shows what's been discussed but not implemented
- Allows selection for batch application
- Feeds selected items to sync.update

#### Current-Queue
Pending from this conversation:
1. **Property rename: CONSUMES → CONSUME**
   - All systems with CONSUME property
   - Rename to singular form for consistency

2. **SUPER field behavior**
   - Keep empty unless explicitly specified
   - Stop auto-filling assumptions

3. **Dataview query cleanup**
   - Remove SYSTEM/STATE columns (partially done)
   - Keep only OPERATION column
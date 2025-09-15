---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[chat.summary]]"
SUPER:
TYPE: aggregator
DEPENDENCY:
  - "[[chat.seeds]]"
  - "[[chat.changes]]"
CONSUME:
SEED:
OBJECTIVE: Aggregate all conversation trackers into a unified summary view
FUNCTION: Collect outputs from seeds, changes, and future trackers in one display
OPERATION: Execute component systems and combine their outputs into dashboard
SPEC-INDEX: [Components, Process, Output-Format, State-Management, Command]
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[chat.summary]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[chat.summary]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[chat.summary]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Aggregate all conversation trackers into a unified summary view
FUNCTION: Collect outputs from seeds, changes, and future trackers in one display
OPERATION: Execute component systems and combine their outputs into dashboard
SPEC-INDEX: [Components, Process, Output-Format, State-Management, Command]

### SPEC-DOC

#### Components
Current tracker systems:
- **chat.seeds** - Undefined concepts and ideas
- **chat.changes** - Pending updates to implement
- [Future systems can be added as dependencies]

Each component:
- Works independently with own command
- Feeds into summary aggregation
- Maintains its own state

#### Process
1. User runs /summary command
2. System calls each component tracker
3. Each returns its current output
4. Aggregate into unified view
5. Present organized dashboard
6. User can drill down to specific trackers

#### Output-Format
```
CONVERSATION SUMMARY - [[250913]]

## PENDING CHANGES (3 items)
1. Property rename: CONSUME → CONSUME
2. SUPER field: Keep empty by default
3. Dataview: Remove redundant columns
[Run /changes for details]

## SEEDS (10 concepts)
- system.objective (schema)
- system.bridges (process)
- chat.context (integration)
[Run /seeds for full list]

## ACTIONS
- Review changes: /changes
- View all seeds: /seeds
- Implement updates: /sync.update
```

#### State-Management
Changes tracking:
- Mark implementation timestamp when changes applied
- Next /changes shows only post-timestamp items
- Maintains continuity across conversations
- Seeds persist until formalized
- Summary shows current state only

#### Command
Execute summary:
- **/summary** - Display complete conversation dashboard
- Shows all tracked elements
- Links to detailed commands
- Quick overview of conversation state
- Identifies what needs attention
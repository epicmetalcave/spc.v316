---
SYSPARCON:
  - "316"
SYSTEM: "[[system.properties]]"
SUPER: "[[system.template]]"
TYPE: schema
DEPENDENCY:
SEED:
OBJECTIVE: Define YAML front matter properties for all systems in the SPC framework
SPEC-DOC:
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[system.properties]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    SYSTEM as "SYSTEM",
    STATE as "STATE",
    OPERATION as "OPERATION"
FROM [[system.properties]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[system.properties]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Define YAML front matter properties for all systems in the SPC framework

SPEC-DOC:
The system-properties schema defines the metadata structure used in YAML front matter for all systems. This enables Obsidian's property system, Dataview queries, and paradigm version tracking.

Schema:
- SPC: Array of paradigm versions where system is active
- SYSTEM: System Name
- SUPER: Parent system in hierarchy
- TYPE: System type
- DEPENDENCY: Systems this system requires
- SEED: Origin or inspiration for the system
- OBJECTIVE: Single statement of purpose
- SPEC-DOC:
- PRIORITY: Importance level
- VERSION: System version number
- STATE: Current state (DRAFT, ACTIVE, LIVE, COMPLETE, DORMANT)

Purpose:
- Enable Dataview queries across vault
- Track system lifecycle across paradigm versions
- Provide consistent metadata structure
- Support Obsidian graph and property views
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
STATE: DRAFT
---

# #SYSTEM/LOG 
## #system/dependency
```dataview
LIST
FROM [[wl.theme]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```

## #system/mentions 
```dataview
TABLE
    SYSTEM as "SYSTEM",
    STATE as "STATE",
    OPERATION as "OPERATION"
FROM [[wl.theme]]
SORT file.name ASC
```

## #SYSTEM/REVIEW  
- [ ] #REVIEW [[wl.theme]]  [repeat:: every 22 days when done]  [due:: 2024-02-16]

# #system/version 

## #system/version/1

Description:
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
- STATE: Current state
Purpose:
- Enable Dataview queries across vault
- Track system lifecycle across paradigm versions
- Provide consistent metadata structure
- Support Obsidian graph and property views




---
SYSPARCON:
  - "316"
SYSTEM: "[[sync-coder]]"
SUPER: "[[command.current]]"
TYPE: command
DEPENDENCY:
SEED:
OBJECTIVE: Generate Claude Coder instructions for all LIVE state systems that need synchronization.
SPEC-DOC: The sync-coder command scans the conversation for systems marked as LIVE and creates formatted instructions for Claude Coder to create or update files in the repository. Only systems ready for deployment are included.
PRIORITY:
VERSION: 1
STATE: DRAFT
---

# #SYSTEM/LOG 
## #system/dependency
```dataview
LIST
FROM [[system.name]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```

## #system/mentions 
```dataview
TABLE
    SYSTEM as "SYSTEM",
    STATE as "STATE",
    OPERATION as "OPERATION"
FROM [[system.name]]
SORT file.name ASC
```

## #SYSTEM/REVIEW  
- [ ] #REVIEW [[{{title}}]]  [repeat:: every 22 days when done]  [due:: 2024-02-16]

# #system/version 

## #system/version/1
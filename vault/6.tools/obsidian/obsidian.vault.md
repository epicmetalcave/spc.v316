---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[obsidian.vault]]"
SUPER:
TYPE: container
DEPENDENCY:
CONSUME:
SEED:
OBJECTIVE: Define the vault structure that organizes all systems in the Obsidian environment
FUNCTION: Establish folder hierarchy for system organization and relationships
OPERATION: Map directory structure to system hierarchy with dynamic reorganization
SPEC-INDEX: [Root-Structure, Organization-Principles, Purpose, Navigation]
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[obsidian.vault]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[obsidian.vault]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[obsidian.vault]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Define the vault structure that organizes all systems in the Obsidian environment
FUNCTION: Establish folder hierarchy for system organization and relationships
OPERATION: Map directory structure to system hierarchy with dynamic reorganization
SPEC-INDEX: [Root-Structure, Organization-Principles, Purpose, Navigation]

### SPEC-DOC

#### Root-Structure
- Obsidian Vault root is vault
- All systems exist as .md files within vault
- Folder names match system categories
- File names follow functional naming patterns
- Top level numbered folders (0-9)
- Folder structure visible in VS Code for development at emill@TOWER:~/spc$

#### Organization-Principles
- Parent systems are files that also become folders
- Parent system file located inside its own folder
- Systems not hard-coded to parent or child relationships
- Can be moved freely to reorganize
- Child systems become files within parent folders
- Standalone systems exist at appropriate level
- Directory path shows system relationships

#### Purpose
- Vault structure IS the system hierarchy
- Moving files reorganizes relationships instantly
- YAML properties enable Dataview queries
- Git-friendly organization for version control

#### Navigation
- Graph view for visual connections
- Folder tree for hierarchical browsing
- Dataview queries for dynamic lists
- Search for direct access
- 9.archive will store all archived folders and files in years ex. archive25 all archived files from 2025
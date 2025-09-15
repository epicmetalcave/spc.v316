---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[sync.version]]"
SUPER:
TYPE: command
DEPENDENCY:
  - "[[system.version]]"
CONSUME:
  - "[[github.repository]]"
  - "[[chat.context]]"
SEED:
OBJECTIVE: Execute complete versioning process by creating history file AND updating main system file
FUNCTION: Generate Claude Coder instructions for both version history creation and main file update
OPERATION: Create version history file with changelog, then update main system file to new version
SPEC-INDEX: [Purpose, Parameters, Process, Operations, Output-Format, Examples]
PRIORITY:
VERSION: 1
STATE: DRAFT
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[sync.version]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync.version]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync.version]]  [repeat:: every 22 days when done]  [due:: 2025-09-14]
# #system/version
## #system/version/1 [[250914]]
OBJECTIVE: Execute complete versioning process by creating history file AND updating main system file
FUNCTION: Generate Claude Coder instructions for both version history creation and main file update
OPERATION: Create version history file with changelog, then update main system file to new version
SPEC-INDEX: [Purpose, Parameters, Process, Operations, Output-Format, Examples]

### SPEC-DOC

#### Purpose
- Execute complete version transition for systems
- Create version history file for archival
- Update main system file to new version
- Ensure atomic versioning (both operations together)
- Support targeted and bulk versioning workflows

#### Parameters
Command supports optional parameter:
- **No parameter**: `/sync.version` - Process ALL systems with version changes
- **With parameter**: `/sync.version [system.name]` - Process ONLY specified system
- Parameter must match exact system name (e.g., `system.creation`, `system.version`)

#### Process
1. **Identify Version Changes**
   - Scan conversation for systems with VERSION > 1
   - Or target specific system if parameter provided
   - Locate both old and new versions

2. **Generate Version History**
   - Extract previous version from main file or conversation
   - Extract new version from conversation
   - Create changelog between versions
   - Format complete history file

3. **Prepare Main File Update**
   - Take new version content
   - Update VERSION property
   - Replace old version section with new

4. **Generate Instructions**
   - CREATE instruction for version history file
   - UPDATE instruction for main system file
   - Both in single artifact

#### Operations
Each versioning performs TWO operations:

**Operation 1: CREATE Version History**
- Location: `1.system/system.version/system.version__[system.name]__v[X].md`
- Content: Complete version history with changelog
- Purpose: Permanent archive of all versions

**Operation 2: UPDATE Main System**
- Location: Existing path of system file
- Content: New version content
- Purpose: Keep main file current

#### Output-Format
For targeted operation (with parameter):

    # CLAUDE CODER SYNC INSTRUCTIONS - VERSION SYNC
    Working Directory: `emill@TOWER:~/spc/vault

    ## VERSIONING: [system.name] (v[old] → v[new])

    ### 1. CREATE Version History File
    Create file: `1.system/system.version/system.version__[system.name]__v[new].md`

    [Full version history content with old version, changelog, and new version]

    ### 2. UPDATE Main System File
    Update file: `[current/path/to/system.name.md]`

    [Full updated system content with VERSION: [new]]

    ## SUMMARY
    - Created version history: system.version__[system.name]__v[new].md
    - Updated main file: [system.name].md to VERSION: [new]
    - Changelog: [brief summary of changes]

For bulk operation (no parameter):

    # CLAUDE CODER SYNC INSTRUCTIONS - BULK VERSION SYNC
    Working Directory: `emill@TOWER:~/spc/vault

    ## VERSIONING OPERATIONS (X systems)

    ### System 1: [system.name] (v[old] → v[new])

    #### 1.1 CREATE Version History
    Create file: `1.system/system.version/system.version__[system.name]__v[new].md`
    [content]

    #### 1.2 UPDATE Main File
    Update file: `[path]`
    [content]

    ### System 2: [another.system] (v[old] → v[new])
    [similar structure]

    ## SUMMARY
    - Total systems versioned: X
    - Version files created: X
    - Main files updated: X

#### Examples
**Example 1: Complete version operation**

    /sync.version system.creation

    Creates:
    1. system.version__system.creation__v2.md (history)
    2. Updates system.creation.md to VERSION: 2

**Example 2: Workflow sequence**

    1. Work on system.creation (make it v2)
    2. /sync.version system.creation
       → Creates history file
       → Updates main file
       → Both operations complete
    3. Continue with other work

**Example 3: What happens to the files**

    BEFORE:
    - system.creation.md (VERSION: 1, has v1 content)
    - No version history file

    AFTER running /sync.version system.creation:
    - system.creation.md (VERSION: 2, has v2 content)
    - system.version__system.creation__v2.md (has v1, changelog, v2)

**Example 4: Bulk versioning**

    /sync.version

    Finds all systems with version > 1:
    - system.creation (v2)
    - system.version (v2)
    - process.changelog (v1) - skipped, no version change

    Generates instructions for:
    - 2 version history files
    - 2 main file updates
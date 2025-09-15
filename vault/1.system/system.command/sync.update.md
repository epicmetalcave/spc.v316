---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[sync.update]]"
SUPER:
  - "[[00_spc]]"
TYPE: command
DEPENDENCY:
CONSUME:
  - "[[github.repository]]"
  - "[[chat.context]]"
SEED:
OBJECTIVE: Sync modified systems from conversation to vault by generating Claude Coder update instructions
FUNCTION: Identify changed systems in repository and create update instructions for vault synchronization
OPERATION: Find modified systems, filter by state, generate UPDATE instructions for vault changes
SPEC-INDEX: [Purpose, Parameters, Process, Filtering, Output-Format, Examples]
PRIORITY:
VERSION: 2
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[sync.update]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync.update]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync.update]]  [repeat:: every 22 days when done]  [due:: 2025-09-14]
# #system/version
## #system/version/2 [[250914]]
OBJECTIVE: Sync modified systems from conversation to vault by generating Claude Coder update instructions
FUNCTION: Identify changed systems in repository and create update instructions for vault synchronization
OPERATION: Find modified systems, filter by state, generate UPDATE instructions for vault changes
SPEC-INDEX: [Purpose, Parameters, Process, Filtering, Output-Format, Examples]

### SPEC-DOC

#### Purpose
- Update existing systems in vault with changes from conversation
- Generate Claude Coder instructions for file modifications
- Support both targeted (single system) and bulk operations
- Clear distinction: for systems that EXIST in repository
- Enable incremental update workflow

#### Parameters
Command supports optional parameter:
- **No parameter**: `/sync.update` - Process ALL modified systems in LIVE/COMPLETE state
- **With parameter**: `/sync.update [system.name]` - Process ONLY specified system
- **With state override**: `/sync.update --all` - Include DRAFT systems too
- Parameter must match exact system name (e.g., `system.properties`, `sync.update`)

#### Process
1. **Identify Modified Systems**
   - Search conversation for systems that exist in repository
   - Check via github.repository integration
   - Or target specific system if parameter provided

2. **Filter by State**
   - Default: Only LIVE and COMPLETE systems
   - With --all flag: Include DRAFT systems
   - Skip DORMANT systems always

3. **Compare Versions**
   - Check conversation version vs repository version
   - Identify changed properties, content, structure
   - Skip if no changes detected

4. **Generate Instructions**
   - Format as UPDATE instructions
   - Maintain current file location
   - Include full updated markdown content

#### Filtering
State filtering logic:
- **LIVE**: Always included (production ready)
- **COMPLETE**: Always included (finished systems)
- **DRAFT**: Only with --all flag (work in progress)
- **DORMANT**: Never included (archived/inactive)
- **No STATE**: Treated as DRAFT

With parameter, state is ignored (user explicitly wants this system).

#### Output-Format
For targeted operation (with parameter):

    # CLAUDE CODER SYNC INSTRUCTIONS - UPDATE SYSTEM
    Working Directory: `emill@TOWER:~/spc/vault

    **IMPORTANT:** Update file in its current location. Do NOT move file.

    ## UPDATE SYSTEM

    ### Update file: `[current/path/]system.name.md`
    ~~~markdown
    [Full updated system content with YAML and body]
    ~~~

    ## SUMMARY
    - System: [system.name]
    - Version: [old] → [new]
    - Changes: [brief summary of what changed]

For bulk operation (no parameter):

    # CLAUDE CODER SYNC INSTRUCTIONS - UPDATE SYSTEMS
    Working Directory: `emill@TOWER:~/spc/vault

    **IMPORTANT:** Update files in their current locations. Do NOT move files.

    ## UPDATE SYSTEMS (X files)

    ### 1. Update file: `system.properties.md`
    ~~~markdown
    [Full updated content]
    ~~~

    ### 2. Update file: `sync.update.md`
    ~~~markdown
    [Full updated content]
    ~~~

    ## SUMMARY
    - Total systems updated: X
    - Version changes: [list any version bumps]
    - Content changes: [types of changes made]

#### Examples
**Example 1: Update all modified LIVE/COMPLETE systems**

    /sync.update

    → Finds: system.properties (changed), sync.update (v2), chat.context (DRAFT)
    → Updates: 2 files (DRAFT excluded)

**Example 2: Update specific system**

    /sync.update system.properties

    → Processes: Only system.properties
    → Updates: Even if minor changes (explicit request)

**Example 3: Include DRAFT systems**

    /sync.update --all

    → Finds: All modified systems regardless of state
    → Updates: Including DRAFT systems

**Example 4: Incremental workflow**

    1. Modify system in conversation
    2. Test changes
    3. /sync.update [system.name] → Update immediately
    4. Continue with next modification

**Example 5: No changes detected**

    /sync.update system.template

    → System exists in repo
    → No changes from conversation version
    → Output: "No changes detected for system.template"

## CHANGELOG/v1-to-v2
**Date:** [[250914]]

**Changes:**
- OBJECTIVE: Reworded to emphasize "sync" and "update" operations
- FUNCTION: Clarified as update instructions generation
- OPERATION: Added filtering and instruction generation details
- SPEC-INDEX: Expanded to include Parameters, Filtering sections
- SPEC-DOC: Complete rewrite with parameter support
- SPEC-DOC/Parameters: Added parameter support for targeted operations
- SPEC-DOC/Filtering: Added state filtering logic
- SPEC-DOC/Examples: Added parameter-based examples
- Dataview queries: Changed from backticks to tildes for proper escaping
- VERSION: Incremented to 2

**Rationale:**
Added parameter support to enable targeted single-system updates, reducing unnecessary bulk operations. State filtering allows better control over which systems to update. The escaping change prevents conflicts with markdown code blocks in nested contexts.

**Impact:**
- Users can now target specific systems for updates
- Better control with state filtering
- Cleaner workflow for incremental development
- Consistent escaping across all systems

**Breaking:** No
- Command remains backward compatible
- Default behavior unchanged (bulk operation)
- Parameters are optional enhancements
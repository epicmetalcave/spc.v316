---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[sync.new]]"
SUPER:
TYPE: command
DEPENDENCY:
CONSUME:
  - "[[github.repository]]"
  - "[[chat.context]]"
SEED:
OBJECTIVE: Sync new systems from conversation to vault by generating Claude Coder build instructions
FUNCTION: Identify systems that don't exist in repository and create implementation instructions
OPERATION: Find new systems, filter by state, generate CREATE instructions for vault implementation
SPEC-INDEX: [Purpose, Parameters, Process, Filtering, Output-Format, Examples, Migration]
PRIORITY:
VERSION: 2
STATE: DRAFT
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[sync.new]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync.new]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync.new]]  [repeat:: every 22 days when done]  [due:: 2025-09-14]
# #system/version
## #system/version/2 [[250914]]
OBJECTIVE: Sync new systems from conversation to vault by generating Claude Coder build instructions
FUNCTION: Identify systems that don't exist in repository and create implementation instructions
OPERATION: Find new systems, filter by state, generate CREATE instructions for vault implementation
SPEC-INDEX: [Purpose, Parameters, Process, Filtering, Output-Format, Examples, Migration]

### SPEC-DOC

#### Purpose
- Implement new systems from conversation into vault
- Generate Claude Coder instructions for file creation
- Support both targeted (single system) and bulk operations
- Clear distinction: for systems NEW to repository (not existing)
- Enable incremental development workflow

#### Parameters
Command supports optional parameter:
- **No parameter**: `/sync.new` - Process ALL new systems in LIVE/COMPLETE state
- **With parameter**: `/sync.new [system.name]` - Process ONLY specified new system
- **With state override**: `/sync.new --all` - Include DRAFT systems too
- Parameter must match exact system name (e.g., `process.changelog`, `sync.version`)

#### Process
1. **Identify New Systems**
   - Search conversation for systems not in repository
   - Check via github.repository integration
   - Or target specific system if parameter provided

2. **Filter by State**
   - Default: Only LIVE and COMPLETE systems
   - With --all flag: Include DRAFT systems
   - Skip DORMANT systems always

3. **Extract System Content**
   - Get latest version from conversation
   - Include full YAML frontmatter
   - Include complete body content

4. **Generate Instructions**
   - Format as CREATE instructions
   - Suggest appropriate vault location
   - Include full markdown content

#### Filtering
State filtering logic:
- **LIVE**: Always included (ready for production)
- **COMPLETE**: Always included (finished systems)
- **DRAFT**: Only with --all flag (work in progress)
- **DORMANT**: Never included (archived/inactive)
- **No STATE**: Treated as DRAFT

With parameter, state is ignored (user explicitly wants this system).

#### Output-Format
For targeted operation (with parameter):

    # CLAUDE CODER SYNC INSTRUCTIONS - NEW SYSTEM
    Working Directory: `emill@TOWER:~/spc/vault

    ## CREATE NEW SYSTEM

    ### Create file: `[suggested/path/]system.name.md`
    ~~~markdown
    [Full system content with YAML and body]
    ~~~

    ## SUMMARY
    - System: [system.name]
    - Type: [TYPE]
    - State: [STATE]
    - Suggested location: [path based on TYPE]

For bulk operation (no parameter):

    # CLAUDE CODER SYNC INSTRUCTIONS - NEW SYSTEMS
    Working Directory: `emill@TOWER:~/spc/vault

    ## CREATE NEW SYSTEMS (X files)

    ### 1. Create file: `process.changelog.md`
    ~~~markdown
    [Full content]
    ~~~

    ### 2. Create file: `sync.version.md`
    ~~~markdown
    [Full content]
    ~~~

    ## SUMMARY
    - Total new systems: X
    - Types: [list of types]
    - States: X LIVE, Y COMPLETE
    - Review file locations before executing

#### Examples
**Example 1: Sync all new LIVE/COMPLETE systems**

    /sync.new

    → Finds: process.changelog (LIVE), sync.version (DRAFT), token.management (COMPLETE)
    → Creates: Instructions for 2 files (DRAFT excluded)

**Example 2: Sync specific new system**

    /sync.new sync.version

    → Processes: Only sync.version
    → Creates: Instructions even though it's DRAFT (explicit request)

**Example 3: Include DRAFT systems**

    /sync.new --all

    → Finds: All new systems regardless of state
    → Creates: Instructions including DRAFT systems

**Example 4: Incremental workflow**

    1. Create new system in conversation (DRAFT)
    2. Test and refine
    3. Update to LIVE
    4. /sync.new [system.name] → Implement immediately
    5. Continue with next system

**Example 5: Suggested paths by TYPE**

    TYPE: command → 1.system/system.command/
    TYPE: process → 1.system/
    TYPE: integration → 6.tools/[tool.name]/
    TYPE: schema → 1.system/
    TYPE: template → 1.system/
    TYPE: container → [evaluate based on content]

#### Migration
Transition from sync.create to sync.new:
- **Old command**: `/sync.create` (deprecated)
- **New command**: `/sync.new`
- **Functionality**: Same core behavior, enhanced with parameters
- **Breaking changes**: None - output format unchanged
- **User impact**: Update command name in workflow

## CHANGELOG/v1-to-v2
**Date:** [[250914]]

**Changes:**
- SYSTEM: Renamed from sync.create to sync.new
- OBJECTIVE: Reworded to emphasize "sync" over "create"
- SPEC-INDEX: Added Parameters, Filtering, Migration sections
- SPEC-DOC/Parameters: Added parameter support for targeted operations
- SPEC-DOC/Filtering: Added state filtering logic
- SPEC-DOC/Examples: Added parameter-based examples
- SPEC-DOC/Migration: Added transition guidance
- FUNCTION: Clarified as "implementation" not "creation"
- OPERATION: Emphasized "build" in vault vs "create" in conversation

**Rationale:**
The name "sync.create" was confusing because creation happens in conversation, not in the sync operation. The sync operation implements/builds systems in the vault. The new name "sync.new" clearly indicates this handles NEW systems (not in repository), distinct from sync.update (existing) and sync.version (versioning).

**Impact:**
- Users must use /sync.new instead of /sync.create
- Parameter support enables targeted workflows
- Clearer mental model of sync operations
- Better alignment with sync.update and sync.version patterns

**Breaking:** Yes (command name change)
- Migration: Replace /sync.create with /sync.new in any documentation or workflows
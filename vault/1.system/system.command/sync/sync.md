---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[sync]]"
SUPER:
TYPE: aggregator
DEPENDENCY:
  - "[[sync.new]]"
  - "[[sync.update]]"
  - "[[sync.version]]"
CONSUME:
  - "[[chat.context]]"
SEED:
OBJECTIVE: Aggregate all sync operations into batched artifacts for manageable repository synchronization
FUNCTION: Execute sync commands, organize results into batches, generate sized artifacts
OPERATION: Call component systems, calculate batch sizes, group operations, format batched instructions
SPEC-INDEX: [Purpose, Components, Process, Batching, Output-Format, Order, Examples]
PRIORITY:
VERSION: 2
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[sync]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[sync]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[sync]]  [repeat:: every 22 days when done]  [due:: 2025-09-14]
# #system/version
## #system/version/2 [[250914]]
OBJECTIVE: Aggregate all sync operations into batched artifacts for manageable repository synchronization
FUNCTION: Execute sync commands, organize results into batches, generate sized artifacts
OPERATION: Call component systems, calculate batch sizes, group operations, format batched instructions
SPEC-INDEX: [Purpose, Components, Process, Batching, Output-Format, Order, Examples]

### SPEC-DOC

#### Purpose
- Provide single command for complete synchronization
- Organize operations into manageable batches
- Prevent artifact size limitations
- Enable incremental review and execution
- Simplify workflow with logical groupings
- Support both small and large sync operations

#### Components
Component sync systems executed:
1. **sync.new** - Creates new systems not in repository
2. **sync.update** - Updates existing modified systems
3. **sync.version** - Versions systems with version changes

Each component:
- Runs without parameters (bulk mode)
- Returns its results to aggregator
- Operations grouped by type for batching
- Maintains logical relationships

#### Process
1. **Execute sync.version**
   - Check for systems with VERSION > 1
   - Collect version operations (creates + updates)

2. **Execute sync.new**
   - Find systems not in repository
   - Filter for LIVE/COMPLETE states
   - Collect creation operations

3. **Execute sync.update**
   - Find modified existing systems
   - Exclude versioned systems
   - Collect update operations

4. **Calculate Batches**
   - Count total operations
   - Apply batching rules
   - Group by operation type
   - Maintain logical cohesion

5. **Generate Artifacts**
   - Create separate artifact per batch
   - Include batch metadata
   - Show progress indicators
   - Provide batch summaries

#### Batching
Batch size calculation:
- **< 10 operations**: 1 batch (all operations together)
- **10-20 operations**: 2 batches (logical split)
- **20-30 operations**: 3 batches (type-based grouping)
- **30+ operations**: 4+ batches (sized chunks)

Batching strategy:
1. **Priority grouping** (keeps related operations together):
   - Version operations (history + main file) stay together
   - New systems can be split if needed
   - Updates can be split across multiple batches

2. **Size limits**:
   - Target: 8-12 operations per batch
   - Maximum: 15 operations per batch
   - Minimum: 4 operations (unless final batch)

3. **Logical boundaries**:
   - Batch 1: Version operations + some new systems
   - Batch 2: Remaining new systems + some updates
   - Batch 3+: Remaining updates

#### Output-Format
For each batch:

    # CLAUDE CODER SYNC - BATCH [X] of [TOTAL]
    Working Directory: `emill@TOWER:~/spc/vault

    ============================================================
    BATCH INFO:
    - Batch: [X] of [TOTAL]
    - Operations: [COUNT] of [TOTAL_OPS]
    - Types: [Version/New/Update]
    ============================================================

    ## OPERATIONS IN THIS BATCH

    [Detailed operations for this batch only]

    ============================================================
    ## BATCH SUMMARY

    This batch contains:
    - [X] version operations
    - [Y] new files
    - [Z] updates

    **Next batch:** [Description of what's coming]
    **Progress:** [====>    ] 40% complete
    ============================================================

Final summary (last batch):

    ============================================================
    ## COMPLETE SYNC SUMMARY

    **All Batches Completed:**
    - Batch 1: [X] operations ✓
    - Batch 2: [Y] operations ✓
    - Total: [TOTAL] operations

    **Recommended Actions:**
    1. Verify all batches executed successfully
    2. Run `/sync.save` to commit to git
    ============================================================

#### Order
Execution and batching order:
1. **Collect all operations** from component systems
2. **Calculate batch count** based on total operations
3. **Group operations** maintaining logical relationships
4. **Generate batches** in order:
   - Version operations first (high priority)
   - New systems second (medium priority)
   - Updates last (can be split freely)
5. **Create artifacts** sequentially

#### Examples
**Example 1: Small sync (8 operations)**

    /sync
    → Total: 8 operations
    → Batches: 1
    → Single artifact with all operations

**Example 2: Medium sync (22 operations)**

    /sync
    → Total: 22 operations
    → Batches: 2

    Batch 1 (10 operations):
    - 4 version operations
    - 6 new systems

    Batch 2 (12 operations):
    - 12 update operations

**Example 3: Large sync (45 operations)**

    /sync
    → Total: 45 operations
    → Batches: 4

    Batch 1 (12 operations):
    - 8 version operations
    - 4 new systems

    Batch 2 (11 operations):
    - 11 new systems

    Batch 3 (11 operations):
    - 11 updates

    Batch 4 (11 operations):
    - 11 updates

**Example 4: Batch execution workflow**

    1. /sync → Generates Batch 1
    2. Copy Batch 1 to Claude Coder
    3. Execute Batch 1
    4. Return for Batch 2
    5. Copy Batch 2 to Claude Coder
    6. Execute Batch 2
    7. /sync.save to commit all

**Example 5: Batch with errors**

    Batch 1: Executed ✓
    Batch 2: Error on file 3
    → Fix issue
    → Re-run Batch 2
    → Continue with Batch 3

**Example 6: Current conversation (22 operations)**

    /sync generates:

    Batch 1 of 2 (8 operations):
    - 2 version histories created
    - 2 main files updated (versions)
    - 4 new systems created

    Batch 2 of 2 (14 operations):
    - 14 system updates (escaping fixes)

## CHANGELOG/v1-to-v2
**Date:** [[250914]]

**Changes:**
- OBJECTIVE: Added "batched artifacts" for manageable synchronization
- FUNCTION: Added batch organization to artifact generation
- OPERATION: Added batch calculation and grouping
- SPEC-INDEX: Added "Batching" section
- SPEC-DOC/Purpose: Added batch management benefits
- SPEC-DOC/Process: Added batch calculation step
- SPEC-DOC/Batching: New section with size rules and strategy
- SPEC-DOC/Output-Format: Updated to show per-batch format
- SPEC-DOC/Examples: Added batching examples
- VERSION: Incremented to 2

**Rationale:**
Large sync operations were causing artifact size limitations and making review difficult. Batching solves these issues by breaking operations into manageable chunks while maintaining logical groupings. This enables incremental execution and better error isolation.

**Impact:**
- Users now receive multiple smaller artifacts instead of one large one
- Each batch can be reviewed and executed independently
- Failed batches can be re-run without affecting completed ones
- Progress tracking is clearer

**Breaking:** No
- Command remains the same (/sync)
- Only output format changes (multiple artifacts instead of one)
- Improves usability without changing interface
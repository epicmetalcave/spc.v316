---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[system.version__system.version__v2]]"
SUPER:
TYPE: version-history
DEPENDENCY:
  - "[[system.version]]"
CONSUME:
SEED:
OBJECTIVE: Track version history for system.version from v1 to v2
FUNCTION: Store complete version snapshots with changelog documentation
OPERATION: Archive previous version, document changes, maintain current version
PRIORITY:
VERSION: 1
STATE: LIVE
---

# Version History: system.version

## #system/version/2 [[250914]]
OBJECTIVE: Transform systems from current version to new version with complete documentation
FUNCTION: Extract, modify, document, and update system versions
OPERATION: Pull system state, apply changes, store history, push current version
SPEC-INDEX: [Extract, Transform, Document, Store, Update, Structure, Naming]

### SPEC-DOC

#### Extract
Retrieve current system state:
- OBJECTIVE
- FUNCTION
- OPERATION
- SPEC-INDEX
- SPEC-DOC (complete body content)

#### Transform
Apply modifications in collaboration:
- Update any changed properties
- Modify SPEC-DOC sections as needed
- Increment VERSION number
- Update date stamp

#### Document
Create changelog entry:
- List all changes made
- Document reasons for changes
- Note any breaking changes
- Reference related systems affected

#### Store
Save to `/1.system/system.version/system.version__[system.name]__v[number].md`:

    ## #system/version/[new] [[date]]
    [Complete new version]

    ## #CHANGELOG/[old]-to-[new]
    **Date:** [[date]]
    **Changes:**
    - [Property]: [what changed]
    **Reason:** [why changed]

    ## #system/version/[old] [[date]]
    [Complete old version]

#### Update
Push to main system file:
- Replace entire version section with new version
- Keep only current version in main file

#### Structure
File organization:
- Version files: `/1.system/system.version/system.version__[system.name]__v[number].md`
- Process runs independently of system type
- Interface standardized via template
- Each version creates new file with incremented version number

#### Naming
Version file naming convention:
- **Pattern:** `system.version__[system.name]__v[number].md`
- **Double underscore (`__`)**: Major boundary separator
- **Example:** `system.version__system.creation__v2.md`
- **Purpose:** Clear visual separation between process, subject, and version
- Single underscore reserved for other uses (sub-instances, dates, etc.)

## #CHANGELOG/v1-to-v2
**Date:** [[250914]]

**Changes:**
- SPEC-INDEX: Added "Naming" section
- SPEC-DOC/Store: Updated file path pattern from dots to double underscores
- SPEC-DOC/Structure: Updated version file path to use double underscore pattern
- SPEC-DOC: Added new Naming section documenting the `__` convention
- PROPERTY: VERSION incremented from 1 to 2

**Rationale:**
The original naming convention used too many dots, making it difficult to parse where the process name ended and the system name began. The double underscore creates clear visual boundaries between the versioning process, the system being versioned, and the version number.

**Impact:**
- All future version files will use the double underscore naming pattern
- Existing version files may be renamed to follow the new convention
- Commands that create version files must use the new pattern

**Breaking:** No
- Change only affects file naming, not functionality
- Old files can coexist with new naming pattern

## #system/version/1 [[250913]]
OBJECTIVE: Transform systems from current version to new version with complete documentation
FUNCTION: Extract, modify, document, and update system versions
OPERATION: Pull system state, apply changes, store history, push current version
SPEC-INDEX: [Extract, Transform, Document, Store, Update, Structure]

### SPEC-DOC

#### Extract
Retrieve current system state:
- OBJECTIVE
- FUNCTION
- OPERATION
- SPEC-INDEX
- SPEC-DOC (complete body content)

#### Transform
Apply modifications in collaboration:
- Update any changed properties
- Modify SPEC-DOC sections as needed
- Increment VERSION number
- Update date stamp

#### Document
Create changelog entry:
- List all changes made
- Document reasons for changes
- Note any breaking changes
- Reference related systems affected

#### Store
Save to `/1.system/system.version/system.version.[system.name].v[number].md`:

    ## #system/version/[new] [[date]]
    [Complete new version]

    ## #CHANGELOG/[old]-to-[new]
    **Date:** [[date]]
    **Changes:**
    - [Property]: [what changed]
    **Reason:** [why changed]

    ## #system/version/[old] [[date]]
    [Complete old version]

#### Update
Push to main system file:
- Replace entire version section with new version
- Keep only current version in main file

#### Structure
File organization:
- Version files: `/1.system/system.version/system.version.[system.name].v[number].md`
- Process runs independently of system type
- Interface standardized via template
- Each version creates new file with incremented version number
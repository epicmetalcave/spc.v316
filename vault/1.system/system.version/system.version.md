---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[system.version]]"
SUPER:
  - "[[01_systems]]"
TYPE: process
DEPENDENCY:
  - "[[system.creation]]"
CONSUME:
  - "[[chat.context]]"
SEED:
OBJECTIVE: Transform systems from current version to new version with complete documentation
FUNCTION: Extract, modify, document, and update system versions
OPERATION: Pull system state, apply changes, store history, push current version
SPEC-INDEX: [Extract, Transform, Document, Store, Update, Structure, Naming]
PRIORITY:
VERSION: 2
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[system.version]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[system.version]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[system.version]]  [repeat:: every 22 days when done]  [due:: 2025-09-14]
# #system/version
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
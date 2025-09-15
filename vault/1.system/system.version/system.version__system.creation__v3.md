---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[system.version__system.creation__v3]]"
SUPER:
TYPE: version-history
DEPENDENCY:
  - "[[system.creation]]"
CONSUME:
SEED:
OBJECTIVE: Track version history for system.creation from v2 to v3
FUNCTION: Store complete version snapshots with changelog documentation
OPERATION: Archive previous version, document changes, maintain current version
PRIORITY:
VERSION: 1
STATE: LIVE
---

# Version History: system.creation

## #system/version/3 [[250914]]
OBJECTIVE: Define the universal template for system creation in the SPC framework
FUNCTION: Render complete system documentation within single markdown code block
OPERATION: Encapsulate entire system with escaped nested code blocks for clean copying
SPEC-INDEX: [Structure, Properties, Format, Sections, Usage, Command, Escaping, Field-Rules]

### SPEC-DOC

#### Structure
Complete system template structure:
- YAML frontmatter with metadata
- System log sections
- Version documentation
- All contained within single code block

#### Properties
YAML frontmatter trinity:
- **OBJECTIVE**: Why the system exists (purpose/goal)
- **FUNCTION**: What the system does (capability/feature)
- **OPERATION**: How the system works (method/process)
- **SPEC-INDEX**: List of documented sections in body
Additional metadata:
- SPC, SYSTEM, TYPE, DEPENDENCY, CONSUME, SEED, PRIORITY, VERSION, STATE
- SUPER: Only added when explicitly specified (see Field-Rules)

#### Format
Code block requirements:
- Single unbroken markdown code block
- Triple backticks with `markdown` language tag
- Nested dataview queries use tildes (~~~)
- Example code blocks use 4-space indentation
- No fragmentation across multiple blocks
- Complete system copyable with single action

#### Sections
Required sections in order:
1. YAML frontmatter
2. #SYSTEM/LOG with dependency and mentions dataviews
3. #SYSTEM/REVIEW with task
4. #system/version with full documentation
5. SPEC-DOC as subsection of version

#### Usage
In conversation:
- System creation displays in this format
- /sync.create uses this template
- Version process extracts from this structure
- All systems follow this standard

#### Command
Execute template creation:
- **/create [system.name]** - Generate new system with template
- User provides system name and details
- Template renders in single code block
- SUPER field left empty unless specified
- Ready for copy to vault

#### Escaping
Nested code block escaping rules:
- **Dataview queries**: Use tildes (~~~) instead of backticks
- **Example code blocks**: Use 4-space indentation
- **Alternative**: Use more backticks (4+) for outer block
- **Goal**: Maintain single copyable code block

Example of proper escaping:

    ~~~dataview
    LIST FROM [[system]]
    ~~~

    Example code:
        function example() {
            return "indented with 4 spaces";
        }

#### Field-Rules
Metadata field behavior standards:

**SUPER field:**
- **Default**: Leave empty - do NOT auto-fill
- **Only add when**: System has explicit hierarchical parent
- **Never assume**: Relationships must be explicitly designed
- **Examples**:
  - ✅ CORRECT: sync.update has `SUPER: [[00_spc]]` (explicitly designed)
  - ✅ CORRECT: Leave empty for most systems (no clear parent)
  - ❌ WRONG: Auto-filling based on folder location
  - ❌ WRONG: Assuming parent from similar names

**Other fields:**
- **STATE**: Start new systems as DRAFT unless explicitly specified
- **VERSION**: Start at 1 for new systems
- **PRIORITY**: Leave empty unless critical system
- **SEED**: Document origin/inspiration if known

## #CHANGELOG/v2-to-v3
**Date:** [[250914]]

**Changes:**
- SPEC-INDEX: Added "Field-Rules" section
- SPEC-DOC/Properties: Added reference to Field-Rules for SUPER field
- SPEC-DOC: Added complete Field-Rules section with SUPER field behavior
- PROPERTY: VERSION incremented from 2 to 3

**Rationale:**
The SUPER field behavior was a pending change that needed formal documentation. Users were unclear when to populate SUPER vs leaving it empty. This creates explicit rules that SUPER should be empty by default and only populated when explicitly designed, preventing auto-fill assumptions.

**Impact:**
- All future systems created with /create will follow these field rules
- Existing systems are not affected
- Clearer documentation prevents confusion about field usage

**Breaking:** No
- Adds documentation only
- No functional changes
- Backward compatible

## #system/version/2 [[250914]]
OBJECTIVE: Define the universal template for system creation in the SPC framework
FUNCTION: Render complete system documentation within single markdown code block
OPERATION: Encapsulate entire system with escaped nested code blocks for clean copying
SPEC-INDEX: [Structure, Properties, Format, Sections, Usage, Command, Escaping]

### SPEC-DOC

#### Structure
Complete system template structure:
- YAML frontmatter with metadata
- System log sections
- Version documentation
- All contained within single code block

#### Properties
YAML frontmatter trinity:
- **OBJECTIVE**: Why the system exists (purpose/goal)
- **FUNCTION**: What the system does (capability/feature)
- **OPERATION**: How the system works (method/process)
- **SPEC-INDEX**: List of documented sections in body
Additional metadata:
- SPC, SYSTEM, TYPE, DEPENDENCY, CONSUME, SEED, PRIORITY, VERSION, STATE
- SUPER: Only added when explicitly specified

#### Format
Code block requirements:
- Single unbroken markdown code block
- Triple backticks with `markdown` language tag
- Nested dataview queries use tildes (~~~)
- Example code blocks use 4-space indentation
- No fragmentation across multiple blocks
- Complete system copyable with single action

#### Sections
Required sections in order:
1. YAML frontmatter
2. #SYSTEM/LOG with dependency and mentions dataviews
3. #SYSTEM/REVIEW with task
4. #system/version with full documentation
5. SPEC-DOC as subsection of version

#### Usage
In conversation:
- System creation displays in this format
- /sync.create uses this template
- Version process extracts from this structure
- All systems follow this standard

#### Command
Execute template creation:
- **/create [system.name]** - Generate new system with template
- User provides system name and details
- Template renders in single code block
- SUPER field left empty unless specified
- Ready for copy to vault

#### Escaping
Nested code block escaping rules:
- **Dataview queries**: Use tildes (~~~) instead of backticks
- **Example code blocks**: Use 4-space indentation
- **Alternative**: Use more backticks (4+) for outer block
- **Goal**: Maintain single copyable code block

Example of proper escaping:

    ~~~dataview
    LIST FROM [[system]]
    ~~~

    Example code:
        function example() {
            return "indented with 4 spaces";
        }
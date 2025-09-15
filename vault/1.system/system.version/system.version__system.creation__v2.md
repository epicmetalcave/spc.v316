---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[system.version__system.creation__v2]]"
SUPER:
TYPE: version-history
DEPENDENCY:
  - "[[system.creation]]"
CONSUME:
SEED:
OBJECTIVE: Track version history for system.creation from v1 to v2
FUNCTION: Store complete version snapshots with changelog documentation
OPERATION: Archive previous version, document changes, maintain current version
PRIORITY:
VERSION: 1
STATE: LIVE
---

# Version History: system.creation

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

## #CHANGELOG/v1-to-v2
**Date:** [[250914]]

**Changes:**
- SPEC-INDEX: Added "Escaping" section
- SPEC-DOC: Added new Escaping section with nested code block rules
- SPEC-DOC/Format: Updated to specify tildes for dataview queries
- SPEC-DOC/Format: Added 4-space indentation for example blocks
- PROPERTY: VERSION incremented from 1 to 2
- STRUCTURE: Updated all dataview queries to use tildes (~~~)

**Rationale:**
System was breaking into multiple code blocks when nested code appeared.
This violated the single-block requirement and made copying difficult.
Proper escaping ensures all systems render as one copyable block.

**Impact:**
- All future systems created with /create will use proper escaping
- Existing systems may want to update their dataview syntax
- sync.create and sync.update should handle both formats

**Breaking:** No
- Change is backward compatible
- Old format still works, new format preferred

## #system/version/1 [[250913]]
OBJECTIVE: Define the universal template for system creation in the SPC framework
FUNCTION: Render complete system documentation within single markdown code block
OPERATION: Encapsulate entire system with escaped nested code blocks for clean copying
SPEC-INDEX: [Structure, Properties, Format, Sections, Usage, Command]

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
- SPC, SYSTEM, TYPE, DEPENDENCY, CONSUMES, SEED, PRIORITY, VERSION, STATE
- SUPER: Only added when explicitly specified

#### Format
Code block requirements:
- Single unbroken markdown code block
- Triple backticks with `markdown` language tag
- Nested dataview queries use escaped backticks
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
---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[system.creation]]"
SUPER:
TYPE: template
DEPENDENCY:
CONSUME:
  - "[[chat.code-block]]"
SEED:
OBJECTIVE: Define the universal template for system creation in the SPC framework
FUNCTION: Render complete system documentation within single markdown code block
OPERATION: Encapsulate entire system with escaped nested code blocks for clean copying
SPEC-INDEX: [Structure, Properties, Format, Sections, Usage, Command, Escaping]
PRIORITY:
VERSION: 2
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[system.creation]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[system.creation]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[system.creation]]  [repeat:: every 22 days when done]  [due:: 2025-09-14]
# #system/version
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
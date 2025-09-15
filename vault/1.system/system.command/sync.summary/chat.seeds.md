---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[chat.seeds]]"
SUPER:
TYPE: container
DEPENDENCY:
CONSUME:
  - "[[chat.context]]"
SEED:
OBJECTIVE: Capture and list loosely defined ideas, concepts, and systems mentioned in conversation that haven't crystallized into formal systems yet
FUNCTION: Track nascent ideas from conversation exploration
OPERATION: Extract and list undefined concepts with description, context, type, and relations
SPEC-INDEX: [Structure, Elements, Purpose, Update-Process, Command]
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[chat.seeds]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[chat.seeds]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[chat.seeds]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Capture and list loosely defined ideas, concepts, and systems mentioned in conversation that haven't crystallized into formal systems yet
FUNCTION: Track nascent ideas from conversation exploration
OPERATION: Extract and list undefined concepts with description, context, type, and relations
SPEC-INDEX: [Structure, Elements, Purpose, Update-Process, Command]

### SPEC-DOC

#### Structure
Simple list format with four tracking elements per seed:
- Each seed captured as list item
- Minimal formatting for quick capture
- Items graduate to formal systems when ready

#### Elements
Four required elements per seed:
1. **System description** - What the idea/concept is
2. **System context** - Where/when it emerged in conversation
3. **System type** - Potential TYPE (command, tool, process, etc.)
4. **System relations** - Related or connected existing systems

#### Purpose
- Prevent idea loss during exploration
- Track potential future systems
- Provide backlog for system development
- Distinguish between discussed vs defined concepts
- Maintain conceptual forging stage

#### Update-Process
- Review conversation for undefined concepts
- Extract system names and ideas
- Capture four elements per seed
- Remove items once formalized
- Date stamp for reference

#### Command
Execute seed extraction:
- **/seeds** - Generate list of nascent ideas from current conversation
- Outputs artifact with all undefined concepts
- Includes four tracking elements per item
- Ready for review and development
---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[system.consume]]"
SUPER:
TYPE: pattern
CONSUME:
SEED:
OBJECTIVE: Define the CONSUME pattern for unidirectional data dependencies between systems
FUNCTION: Document how systems declare and use data from provider systems
OPERATION: Establish one-way consumption relationships without reverse dependencies
SPEC-INDEX:
  - Pattern
  - Structure
  - Rules
  - Implementation
  - Purpose
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[system.consume]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[system.consume]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[system.consume]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Define the CONSUME pattern for unidirectional data dependencies between systems
FUNCTION: Document how systems declare and use data from provider systems
OPERATION: Establish one-way consumption relationships without reverse dependencies
SPEC-INDEX: [Pattern, Structure, Rules, Implementation, Purpose]

### SPEC-DOC

#### Pattern
CONSUME defines permanent architectural dependencies:
- Structural relationships, not execution relationships
- Dependencies exist whether actively used or not
- Like electrical wiring - always present, activated by use
- Commands trigger consumption but don't create the relationship

#### Structure
- **Provider:** System that supplies data/functionality (unaware of consumers)
- **Consumer:** System that depends on provider's structure
- **Direction:** Always one-way (provider → consumer)
- Consumer declares dependency via CONSUME property
- Provider remains independent

#### Rules
- One-way flow only (no circular dependencies)
- Provider can have multiple consumers
- Consumer breaks if provider interface changes
- Provider can evolve if interface maintained
- Dependencies are permanent, not conditional
- Consumption exists at system level, not command level

#### Implementation
In YAML frontmatter:
```yaml
CONSUME:
  - "[[github.repository]]"
  - "[[chat.context]]"
```
Consumer explicitly declares all provider systems it depends on.

#### Purpose
- Clear dependency tracking
- Prevent circular references
- Document data flow architecture
- Enable impact analysis
- Support plugin architecture
- Maintain clean system boundaries
- Foundation for architectural mapping
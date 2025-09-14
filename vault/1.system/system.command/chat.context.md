---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[chat.context]]"
SUPER:
TYPE: interface
DEPENDENCY:
CONSUME:
SEED:
OBJECTIVE: Provide platform-agnostic interface for accessing conversation context
FUNCTION: Enable systems to access conversation history and content regardless of chat provider
OPERATION: Abstract conversation data access from specific AI implementation
SPEC-INDEX: [Purpose, Interface, Implementations, Contract, Usage]
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
```dataview
LIST
FROM [[chat.context]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
```
## #system/mentions
```dataview
TABLE
    OPERATION as "OPERATION"
FROM [[chat.context]]
SORT file.name ASC
```
## #SYSTEM/REVIEW
- [ ] #REVIEW [[chat.context]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Provide platform-agnostic interface for accessing conversation context
FUNCTION: Enable systems to access conversation history and content regardless of chat provider
OPERATION: Abstract conversation data access from specific AI implementation
SPEC-INDEX: [Purpose, Interface, Implementations, Contract, Usage]

### SPEC-DOC

#### Purpose
- Platform-agnostic conversation access
- Decouples systems from specific AI providers
- Enables portability across chat platforms
- Maintains clean architecture boundaries
- Future-proofs against provider changes

#### Interface
Provides access to:
- Current conversation messages
- Message history
- User inputs and AI responses
- Conversation metadata (timestamps, session ID)
- Search within conversation
- Extract specific content types

#### Implementations
Can be implemented by:
- claude.context (Anthropic Claude)
- gpt.context (OpenAI)
- gemini.context (Google)
- local.context (stored conversations)
- Any future chat provider

#### Contract
Systems consuming chat.context expect:
- Access to full conversation history
- Ability to search for patterns
- Extract mentioned concepts
- Track state changes
- No provider-specific dependencies

#### Usage
Systems declare consumption:
```yaml
CONSUME:
  - "[[chat.context]]"
```
Implementation handled by environment, not system.
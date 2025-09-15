---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[process.changelog]]"
SUPER:
TYPE: process
DEPENDENCY:
  - "[[system.version]]"
CONSUME:
  - "[[chat.context]]"
SEED:
OBJECTIVE: Document and track all changes between system versions with rationale and impact
FUNCTION: Create standardized changelog entries for system modifications
OPERATION: Extract changes, document rationale, assess impact, format entry, append to version history
SPEC-INDEX: [Purpose, Structure, Format, Process, Standards, Examples]
PRIORITY:
VERSION: 1
STATE: DRAFT
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[process.changelog]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[process.changelog]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[process.changelog]]  [repeat:: every 22 days when done]  [due:: 2025-09-14]
# #system/version
## #system/version/1 [[250914]]
OBJECTIVE: Document and track all changes between system versions with rationale and impact
FUNCTION: Create standardized changelog entries for system modifications
OPERATION: Extract changes, document rationale, assess impact, format entry, append to version history
SPEC-INDEX: [Purpose, Structure, Format, Process, Standards, Examples]

### SPEC-DOC

#### Purpose
- Maintain complete history of system evolution
- Document rationale for each change
- Track breaking changes and impacts
- Enable rollback understanding
- Support audit and review processes
- Facilitate knowledge transfer

#### Structure
Changelog location in version files:

    ## #CHANGELOG/[old]-to-[new]
    **Date:** [[YYMMDD]]
    **Changes:**
    - [Category]: [What changed]
    **Rationale:** [Why changed]
    **Impact:** [Who/what affected]
    **Breaking:** [Yes/No - details if yes]

Categories for changes:
- **PROPERTY**: YAML frontmatter modifications
- **SPEC-DOC**: Documentation updates
- **STRUCTURE**: File/folder reorganization
- **DEPENDENCY**: Dependency additions/removals
- **FUNCTION**: Core functionality changes
- **OPERATION**: Process/method modifications

#### Format
Standard changelog entry template:

    ## #CHANGELOG/v1-to-v2
    **Date:** [[250914]]
    **Author:** [[user]] (if tracked)

    **Changes:**
    - PROPERTY: Changed STATE from DRAFT to LIVE
    - SPEC-DOC: Added troubleshooting section
    - DEPENDENCY: Added [[new.system]] dependency
    - FUNCTION: Enhanced error handling capability

    **Rationale:**
    System ready for production use after testing phase.
    Added troubleshooting based on user feedback.

    **Impact:**
    - Consumers must handle new error response format
    - [[dependent.system]] needs update to match

    **Breaking:** Yes
    - Error responses now return structured JSON instead of strings
    - Migration: Update error handlers to parse JSON response

#### Process
1. **Identify Changes**
   - Compare old version with new version
   - List all modifications by category
   - Note additions, deletions, modifications

2. **Document Rationale**
   - Why was each change necessary?
   - What problem does it solve?
   - Who requested or identified need?

3. **Assess Impact**
   - Which systems are affected?
   - What behaviors change?
   - Are there breaking changes?

4. **Format Entry**
   - Use standard template
   - Group related changes
   - Be concise but complete

5. **Append to History**
   - Add to version file
   - Maintain chronological order
   - Link to related issues/discussions

#### Standards
Best practices for changelogs:
- **Atomic**: One changelog per version increment
- **Complete**: Document ALL changes, even minor ones
- **Clear**: Use plain language, avoid jargon
- **Actionable**: Include migration steps for breaking changes
- **Traceable**: Reference related systems and discussions
- **Searchable**: Use consistent category tags

Version numbering:
- Major (v1 → v2): Breaking changes
- Minor (v1.1 → v1.2): New features, non-breaking
- Patch (v1.1.1 → v1.1.2): Bug fixes, documentation

#### Examples
**Simple property change:**

    ## #CHANGELOG/v1-to-v2
    **Date:** [[250914]]
    **Changes:**
    - PROPERTY: STATE changed from DRAFT to LIVE
    **Rationale:** System tested and ready for use
    **Impact:** None - metadata only
    **Breaking:** No

**Complex multi-system update:**

    ## #CHANGELOG/v2-to-v3
    **Date:** [[250914]]
    **Changes:**
    - FUNCTION: Now consumes [[api.service]] for data
    - OPERATION: Switched from polling to webhook-based updates
    - DEPENDENCY: Added [[api.service]], removed [[file.watcher]]
    - SPEC-DOC: Rewrote integration section

    **Rationale:**
    Performance issues with file polling at scale.
    Webhooks provide real-time updates with lower resource usage.

    **Impact:**
    - [[monitor.dashboard]] must update to handle webhook events
    - [[alert.system]] needs new event type handlers
    - Configuration files need webhook URL setting

    **Breaking:** Yes
    - Polling configuration no longer supported
    - Migration required:
      1. Register webhook endpoint in api.service
      2. Update config with webhook URL
      3. Remove polling interval settings
      4. Deploy new version
      5. Verify webhook receipt
---
SPC:
  - "[[spc.v316]]"
SYSTEM:
  - "[[github.repository]]"
SUPER:
  - "[[06_tools]]"
TYPE: integration
CONSUME:
SEED:
OBJECTIVE: Provide GitHub repository integration for file synchronization and version control
SPEC-DOC: The github.repository system enables connection to the GitHub repository epicmetalcave/spc.v316 for checking file existence, tracking changes, and synchronizing vault content with version control. Serves as the source of truth for file state in sync operations.
PRIORITY:
VERSION: 1
STATE: LIVE
---
# #SYSTEM/LOG
## #system/dependency
~~~dataview
LIST
FROM [[github.repository]]
WHERE contains(DEPENDENCY, this.file.link)
  AND file.path != this.file.path
~~~
## #system/mentions
~~~dataview
TABLE
    OPERATION as "OPERATION"
FROM [[github.repository]]
SORT file.name ASC
~~~
## #SYSTEM/REVIEW
- [ ] #REVIEW [[github.repository]]  [repeat:: every 22 days when done]  [due:: 2025-09-13]
# #system/version
## #system/version/1 [[250913]]
OBJECTIVE: Provide GitHub repository integration for file synchronization and version control

SPEC-DOC:
The github.repository system enables connection to the GitHub repository epicmetalcave/spc.v316 for checking file existence, tracking changes, and synchronizing vault content with version control. Serves as the source of truth for file state in sync operations.

Configuration:
- Repository URL: `https://github.com/epicmetalcave/spc.v316`
- Repository name: spc.v316
- Owner: epicmetalcave
- Default branch: main
- Local path: `~/spc/`
- Vault path: `~/spc/vault/`
- File format: Markdown (.md)

Git Commands:
```bash
# Clone repository
git clone https://github.com/epicmetalcave/spc.v316.git ~/spc

# Check file status
git status

# Check if specific file exists
git ls-files --error-unmatch vault/filename.md

# Get diff for file
git diff vault/filename.md
```

Functions:
- Check if file exists in repository
- Compare file content for changes
- Retrieve file status (new/modified/unchanged)
- List all files in repository
- Track commit history
- Provide diff between local and remote

Integration Points:
- Git CLI commands
- GitHub API (when needed)
- Local git status checks
- Remote repository queries

Used By:
- sync.create: Check for new files
- sync.update: Identify modified files
- sync.coder: Coordinate sync operations

Output:
- File existence status (boolean)
- File modification status (new/modified/unchanged)
- Last commit hash
- Diff content when requested
module.exports = {
  pattern: /^((master|develop)|(feature|hotfix|release)\/\w+\-\d+)$/,
  errorMsg: `Branch name is invalid, valid branch names are:
 - master
 - develop
 - release/JIRA-CODE
 - feature/JIRA-CODE
 - hotfix/JIRA-CODE
Obs.: JIRA-CODE must be a valid Jira card issue code, such as "release/TEAM10-123"`
}

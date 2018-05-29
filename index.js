module.exports = (robot) => {

  robot.on(["issues.unassigned"], async context => {
    context.github.issues.addAssigneesToIssue(context.issue({
      assignees: [context.payload.sender.login]
    }));
  });

  robot.on(["issues.opened", "issues.edited"], async context => {
    if (context.payload.issue.assignees.length === 0) {
      context.github.issues.addAssigneesToIssue(context.issue({
        assignees: [context.payload.sender.login]
      }));
    }
  });
  
};
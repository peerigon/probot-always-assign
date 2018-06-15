"use strict";

function assignSender(context) {
  context.github.issues.addAssigneesToIssue(context.issue({
    assignees: [context.payload.sender.login]
  }));
}

module.exports = (robot) => {

  robot.on(["issues.opened", "issues.edited", "issues.unassigned"], async context => {
    if (context.payload.issue.assignees.length === 0) {
      assignSender(context);
    }
  });

};
"use strict";

function assignSender(context) {
  context.github.issues.addAssigneesToIssue(
    context.issue({
      assignees: [context.payload.sender.login],
    })
  );
}

module.exports = (robot) => {
  robot.on(
    ["issues.opened", "issues.edited", "issues.unassigned"],
    async (context) => {
      const config = await context.config("always-assign.yml", {
        enabled: true,
      });

      if (!config.enabled) {
        return;
      }

      if (context.payload.issue.assignees.length === 0) {
        assignSender(context);
      }
    }
  );
};

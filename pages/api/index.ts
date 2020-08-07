import { prismy, res } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { User, DayLog } from '../../lib/models'
import {
  sessionMiddleware,
  authenticatedUserSelector,
} from '../../lib/selectors'
import { withErrorHandler } from '../../lib/middlewares'

export default methodRouter({
  get: prismy(
    [authenticatedUserSelector],
    async (user) => {
      let dayLogs
      if (user != null) {
        dayLogs = await DayLog.findAll({
          where: {
            userId: user.id,
          },
        })
      }

      return res({ user, dayLogs })
    },
    [sessionMiddleware, withErrorHandler]
  ),
})

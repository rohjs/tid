import { prismy, createError, redirect } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import {
  authenticatedUserSelector,
  sessionMiddleware,
  bodySelector,
} from '../../../lib/selectors'
import { withErrorHandler } from '../../../lib/middlewares'
import { DayLog } from '../../../lib/models'

export const createDayLog = prismy(
  [authenticatedUserSelector, bodySelector],
  async (user, body) => {
    if (user == null) {
      throw createError(401, 'Unauthorized user')
    }

    const { date, title, content } = body

    const dayLog = await DayLog.create({
      date,
      title,
      content,
      userId: user.id,
    })

    return redirect('/')
  },
  [sessionMiddleware, withErrorHandler]
)

export default methodRouter({
  post: createDayLog,
})

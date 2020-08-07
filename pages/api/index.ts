import { prismy, res } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { User } from '../../lib/models'
import { sessionSelector, sessionMiddleware } from '../../lib/selectors'
import { withErrorHandler } from '../../lib/middlewares'

export default methodRouter({
  get: prismy(
    [sessionSelector],
    async (session) => {
      const { userId } = session.data || {}

      const user = isNaN(parseInt(userId, 10))
        ? null
        : await User.findOne({
            where: {
              id: parseInt(userId, 10),
            },
          })

      return res({ user })
    },
    [sessionMiddleware, withErrorHandler]
  ),
})

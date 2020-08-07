import { AsyncSelector } from 'prismy'
import { User } from '../models'
import { sessionSelector } from './sessionSelector'

export const authenticatedUserSelector: AsyncSelector<User> = async (ctx) => {
  const session = await sessionSelector(ctx)
  const { userId } = session.data || {}
  const parsedUserid = parseInt(userId, 10)

  return isNaN(parsedUserid)
    ? null
    : await User.findOne({
        where: {
          id: parsedUserid,
        },
      })
}

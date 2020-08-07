import { prismy, querySelector, redirect } from 'prismy'
import { methodRouter } from 'prismy-method-router'
import { Octokit } from '@octokit/rest'
import { createOAuthAppAuth } from '@octokit/auth-oauth-app'
import { TokenAuthentication } from '@octokit/auth-oauth-app/dist-types/types'
import { User, GithubUserProfile } from '../../../lib/models'
import { withErrorHandler } from '../../../lib/middlewares'
import { sessionSelector, sessionMiddleware } from '../../../lib/selectors'

export default methodRouter({
  get: prismy(
    [querySelector, sessionSelector],
    async (query, session) => {
      const { code } = query

      const auth = createOAuthAppAuth({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        code: code as string,
      })
      const { token } = (await auth({ type: 'token' })) as TokenAuthentication
      const octokit = new Octokit({ auth: token })

      const githubUser = await octokit.users.getAuthenticated()
      const { login: username, id: githubId } = githubUser.data

      let githubUserProfile = await GithubUserProfile.findOne({
        where: {
          githubId,
        },
      })
      let user: User

      if (githubUserProfile == null) {
        user = await User.create({
          name: username,
        })
        githubUserProfile = await GithubUserProfile.create({
          githubId,
          githubToken: token,
          userId: user.id,
        })
      } else {
        user = await User.findOne({
          where: {
            id: githubUserProfile.userId,
          },
        })
        githubUserProfile.githubToken = token
        user.name = username
      }
      await user.save()
      await githubUserProfile.save()

      session.data = {
        ...session.data,
        userId: user.id,
      }

      return redirect('/')
    },
    [sessionMiddleware, withErrorHandler]
  ),
})

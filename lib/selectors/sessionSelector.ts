import createSession from 'prismy-session'
import JWTCookieStrategy from 'prismy-session-strategy-jwt-cookie'

export const { sessionSelector, sessionMiddleware } = createSession(
  new JWTCookieStrategy({
    secret: 'RANDOM_HASH',
  })
)

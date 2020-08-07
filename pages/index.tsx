import React from 'react'
import { GetServerSideProps } from 'next'
import got from 'got'

const HomePage = ({ user }) => {
  const oAuthUrl = `https://github.com/login/oauth/authorize/?client_id=Iv1.0727ee662a63a985`

  return (
    <section>
      <h1>HomePage</h1>
      <a href={oAuthUrl}>Sign up via Github</a>
      <hr />

      <code>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </code>
    </section>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await got('http://localhost:3000/api', {
    headers: {
      cookie: ctx.req.headers.cookie,
    },
  }).json()

  return {
    props: {
      user,
    },
  }
}

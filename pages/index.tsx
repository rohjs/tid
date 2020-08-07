import React from 'react'
import { GetServerSideProps } from 'next'
import got from 'got'

const HomePage = ({ user, dayLogs }) => {
  const oAuthUrl = `https://github.com/login/oauth/authorize/?client_id=Iv1.0727ee662a63a985`

  return (
    <section>
      <h1>HomePage</h1>
      {!user && <a href={oAuthUrl}>Sign up via Github</a>}
      <hr />
      <form action="/api/dayLogs" method="POST">
        <input type="text" placeholder="Date" name="date" />
        <input type="text" placeholder="Title" name="title" />
        <textarea placeholder="Content" name="content" />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <ul>
        {dayLogs &&
          dayLogs.map((dayLog) => (
            <li key={`${user.id}-${dayLog.date}-${dayLog.id}`}>
              <h1>{dayLog.title}</h1>
              <p>{dayLog.content}</p>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user, dayLogs } = await got('http://localhost:3000/api', {
    headers: {
      cookie: ctx.req.headers.cookie,
    },
  }).json()

  return {
    props: {
      user,
      dayLogs,
    },
  }
}

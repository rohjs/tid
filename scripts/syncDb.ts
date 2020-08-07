import { User, GithubUserProfile, DayLog } from '../lib/models'

async function syncDb() {
  await User.sync({ force: true })
  await GithubUserProfile.sync({ force: true })
  await DayLog.sync({ force: true })
}

syncDb()
  .then(() => {
    console.log(`> Finished syncing model`)
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

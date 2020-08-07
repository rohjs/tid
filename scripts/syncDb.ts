import { Post, User, GithubUserProfile } from '../lib/models'

async function syncDb() {
  await Post.sync()
  await User.sync()
  await GithubUserProfile.sync()
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

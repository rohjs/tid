import User from './User'
import GithubUserProfile from './GithubUserProfile'
import Post from './Post'

User.hasOne(GithubUserProfile)
GithubUserProfile.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
})

export { User, GithubUserProfile, Post }

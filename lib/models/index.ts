import User from './User'
import GithubUserProfile from './GithubUserProfile'
import DayLog from './DayLog'

User.hasOne(GithubUserProfile)
GithubUserProfile.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
})

User.hasMany(DayLog)
DayLog.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
})

export { User, GithubUserProfile, DayLog }

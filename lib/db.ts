import { Model } from 'sequelize'
import { User, GithubUserProfile, DayLog } from './models'

export function fixSequelizeModel(newTarget: any, self: Model) {
  Object.keys(newTarget.rawAttributes).forEach((propertyKey: keyof Model) => {
    Object.defineProperty(self, propertyKey, {
      get() {
        return self.getDataValue(propertyKey)
      },
      set(value) {
        self.setDataValue(propertyKey, value)
      },
    })
  })
}

export async function truncateAllTables() {
  await DayLog.destroy({ truncate: true, cascade: true })
  await GithubUserProfile.destroy({ truncate: true, cascade: true })
  await User.destroy({ truncate: true, cascade: true })
}

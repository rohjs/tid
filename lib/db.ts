import { Model } from 'sequelize'

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

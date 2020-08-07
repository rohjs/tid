import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface DayLogAttributes {
  date: string
  title: string
  content: string
  userId: number
}

interface DayLogCreationAttributes extends Omit<DayLogAttributes, 'id'> {}

class DayLog extends Model<DayLogAttributes, DayLogCreationAttributes>
  implements DayLogAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  readonly id!: number
  date!: string
  title!: string
  content!: string
  userId!: number

  createdAt!: Date
  updatedAt!: Date
}

DayLog.init(
  {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'DayLog',
  }
)

export default DayLog

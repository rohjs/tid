import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface GithubUserProfileAttributes {
  id: number
  githubToken: string
  githubId: number
  userId: number
}

interface GithubUserProfileCreationAttributes
  extends Omit<GithubUserProfileAttributes, 'id'> {}

class GithubUserProfile
  extends Model<
    GithubUserProfileAttributes,
    GithubUserProfileCreationAttributes
  >
  implements GithubUserProfileAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  public readonly id!: number
  public githubToken!: string
  public githubId!: number
  public readonly userId!: number

  public createdAt!: Date
  public updatedAt!: Date
}

GithubUserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    githubToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    githubId: {
      type: DataTypes.INTEGER,
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
    modelName: 'GithubUserProfile',
  }
)

export default GithubUserProfile

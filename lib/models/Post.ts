import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface PostAttributes {
  title: string
  content: string
}

class Post extends Model<PostAttributes> implements PostAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  public readonly id!: number
  public title!: string
  public content!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'Post',
  }
)

export default Post

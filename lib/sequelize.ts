import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '', {
  host: process.env.DB_HOST,
  dialect: 'postgres',
})

export default sequelize

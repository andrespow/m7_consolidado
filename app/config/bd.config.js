import Sequelize from 'sequelize';

const sequelize = new Sequelize('db_bootcamp','postgres', 'rosa1009', {
    host:'localhost',
    dialect: 'postgres'
})

export default sequelize
import { Sequelize } from "sequelize";

const db = new Sequelize('admin_client', 'root', 'Kevin1214', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,

})

export default db;
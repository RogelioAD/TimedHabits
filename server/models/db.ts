import { Sequelize } from 'sequelize';

const timedhabitsdb = new Sequelize( 'timedhabits', 'root', 'Password1!', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
});

export default timedhabitsdb;
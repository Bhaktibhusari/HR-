const Sequelize = require('sequelize');
let dotenv = require('dotenv');

dotenv.config()

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_DIALECT, process.env.DATABASE_USER, {
//     host: process.env.DATABASE_HOST,
//     dialect: process.env.DATABASE_DIALECT,
//     port: process.env.DATABASE_PORT
// });

const sequelize = new Sequelize('Glpl', 'postgres', 'ganaka', {
    dialect: 'postgres',
    host: 'localhost',
});

// sequelize.authenticate()
// .then(() => {
//     console.log('Connection established successfully.')
// })
// .catch(err => {
//     console.error('Unable to connect to the database:', err);
// });


global.sequelize = sequelize;
module.exports = sequelize;
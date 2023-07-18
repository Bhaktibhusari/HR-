const Sequelize = require("sequelize");
const sequelize = require("../config/db");
let userAttendence = require("../models/userAttendenceModel");
const userDetails = require("../models/userDetailsModel.js");

let user = sequelize.define("gl_users",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        joinDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        CreatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        createdBy: {
            type: Sequelize.STRING,
            defaultValue: "SYSTEM",
        },
        updatedBy: {
            type: Sequelize.STRING,
            defaultValue: "SYSTEM",
        },
    },
    {
        timestamps: true,
        underscored: true
    });

user.hasMany(userAttendence, { as: 'user', foreignKey: 'userId' });
userAttendence.belongsTo(user, { foreignKey: 'userId' });

user.hasOne(userDetails, { as: 'userDetail', foreignKey: 'userId' });
userDetails.belongsTo(user, { foreignKey: 'userId' });


module.exports = user;
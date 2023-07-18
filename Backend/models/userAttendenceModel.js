const Sequelize = require("sequelize");
const sequelize = require("../config/db");


let userAttendence = sequelize.define("gl_userAttendence",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        login: {
            type: Sequelize.TIME,
            allowNull: true,
        },
        logout: {
            type: Sequelize.TIME,
            allowNull: true,
        },
        attendstatus: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hrapproval: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
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
    }
);

module.exports = userAttendence;


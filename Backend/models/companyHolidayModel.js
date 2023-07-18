const Sequelize = require("sequelize");
const sequelize = require("../config/db");

let compamyHoliday = sequelize.define("gl_companyHoliday",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        holidayDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        day: {
            type: Sequelize.STRING,
            allowNull: true
        },
        holidayname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
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
    });

module.exports = compamyHoliday;
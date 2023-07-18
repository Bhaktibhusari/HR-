const Sequelize = require("sequelize");
const sequelize = require("../config/db");

let userDetails = sequelize.define("gl_userDetails",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        hdate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        department: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        createdBy: {
            type: Sequelize.STRING,
            defaultValue: false,
        },
        updatedBy: {
            type: Sequelize.STRING,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
        underscored: true
    }
);

module.exports = userDetails;
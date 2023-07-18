let companyHoliday = require("../models/companyHolidayModel.js");
const user = require("../models/userModel.js");
const { Op } = require("sequelize");

let getCompanyHolidayList = async (req, res, next) => {

    try {
        console.time("companyHolidayController : getCompanyHolidayList");
        const data = await companyHoliday.findAll(
            {
                where: { isDeleted: false },
                raw: true,
            });
        let noOfRecords = data.length;
        console.timeEnd("companyHolidayController : getCompanyHolidayList");
        res.status(200).json({
            noOfRecords: noOfRecords,
            data: data,
        });
    } catch (err) {
        next(err);
    }

};

let getCompanyHoliday = async (req, res, next) => {
    try {
        console.time("companyHolidayController : getCompanyHoliday");
        const holidayCalendarId = req.params.id;
        console.log("companyHoliday : getHolidayCalendar :: holidayCalendarId:", holidayCalendarId)
        const data = await companyHoliday.findOne(
            {
                where: { id: holidayCalendarId, isDeleted: false },
                raw: true,
                attributes: [
                    'id', 'holidayDate', 'title', 'description',
                ]
            });
        console.timeEnd("companyHolidayController : getCompanyHoliday");
        res.status(200).json({
            data: data,
        })
    } catch (err) {
        next(err);
    }
};

let createCompanyHoliday = async (req, res, next) => {

    try {
        const { holidayDate, day, holidayname } = req.body;
        console.log(holidayDate);
        const isholidayDateExists = await companyHoliday.findOne({
            where: {
                holidayDate: {
                    [Op.eq]: holidayDate,
                }
            }
        });
        console.log("companyHolidayController : createCompanyHoliday :: isholidayDateExists :", isholidayDateExists);

        if (isholidayDateExists) {
            res.status(409).json({
                error: true,
                message: "This Date already mentioned as holiday try with some other Date",
                data: null
            });
        } else {
            const data = await companyHoliday.create({
                holidayDate,
                day,
                holidayname,
            })

            res.status(200).json({
                data: data,
            });
        }
    } catch (err) {
        console.log(error);
        next(err);
    }
};


let updateCompanyHoliday = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { holidayDate, day, holidayname } = req.body;

        console.log("companyHolidayController : updateCompanyHoliday :: id :", id);
        const companyHolidayData = await companyHoliday.findOne({ where: { id: id } });
        console.log(id);
        if (!companyHolidayData) {
            res.status(409).json({
                error: true,
                message: "Holiday does not exist..",
                data: null
            });
        } else {
            const updateData = await companyHoliday.update(
                {
                    holidayDate,
                    day,
                    holidayname,
                },
                {
                    where: { id: id },
                });

            console.log("companyHolidayController : updateCompanyHoliday", updateData);
            res.status(200).json({
                holidayDate: holidayDate,
                title: title,
                description: description,
            })
        }
    } catch (err) {
        next(err);
    }
}

let deleteCompanyHoliday = async (req, res, next) => {
    try {
        console.time("companyHolidayController : deleteCompanyHoliday");
        let { id } = req.params;
        console.log("companyHolidayController : deleteCompanyHoliday :: Deleting holiday with id" + id);
        await companyHoliday.update(
            {
                isDeleted: true,
            },
            { where: { id: id } }
        );
        console.timeEnd("companyHolidayController : deleteCompanyHoliday");
        res.status(200).json({});
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getCompanyHolidayList,
    getCompanyHoliday,
    createCompanyHoliday,
    updateCompanyHoliday,
    deleteCompanyHoliday
}
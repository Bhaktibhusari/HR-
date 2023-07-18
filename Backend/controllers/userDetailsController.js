let userDetails = require("../models/userDetailsModel.js");

let getuserDetailsList = async (req, res, next) => {
    try {
        console.time("userDetailsController : getuserDetailsList");
        const data = await userDetails.findAll(
            {
                where: { isDeleted: false },
                raw: true,
            });
        let noOfRecords = data.length;
        console.timeEnd("userDetailsController : getuserDetailsList");
        res.status(200).json({
            noOfRecords: noOfRecords,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

let getuserDetails = async (req, res, next) => {
    try {
        console.time("userDetailsController : getuserDetails");
        const userId = req.params.id;
        console.log("userDetails : getuserDetails :: userId is:", userId)
        const data = await userDetails.findOne(
            {
                where: { id: userId, isDeleted: false },
                raw: true,
                attributes: [
                    'id', 'dob', 'gender', 'hdate', 'title', 'department',
                ]
            });
        console.timeEnd("userDetailsController : getuserDetails");
        res.status(200).json({
            data: data,
        })
    } catch (err) {
        next(err);
    }
};

let createUserDetails = async (req, res, next) => {
    try {
        const { dob, gender, hdate, title, department, userId } = req.body

        // const isUserExists = await userDetails.findOne({ where: { userId: userId } });
        // console.log("userDetailsController : createUserDetails :: isUserExists :", isUserExists);

        // if (isUserExists) {
        //     res.status(409).json({
        //         error: true,
        //         message: "User already exists..",
        //         data: null
        //     });
        // } else {
        const data = await userDetails.create({
            dob,
            gender,
            hdate,
            title,
            department,
            userId,
        })
        res.status(200).json({
            data: data,
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};

let updateUserDetails = async (req, res, next) => {
    try {
        const { id, dob, gender, hdate, title, department, userId } = req.body;

        console.log("userDetailsController : updateUserDetails :: userId : ", userId);
        const userData = await user.findOne({ where: { userId: userId } });

        if (!userData) {
            res.status(409).json({
                error: true,
                message: "User does not exists..",
                data: null
            });
        } else {
            const updateData = await userDetails.update(
                {
                    id,
                    dob,
                    gender,
                    hdate,
                    title,
                    department,
                    userId,
                },
                {
                    where: { userId: userId },
                });
            console.log("userDetailsController : updateUserDetails", updateData);
            res.status(200).json({
                id: id,
                dob: dob,
                gender: gender,
                hdate: hdate,
                title: title,
                department: department,
            })
        }
    } catch (err) {
        next(err);
    }
};

let deleteUserDetails = async (req, res, next) => {
    try {
        console.time("userDetailsController : deleteUserDetails");
        let { userId } = req.params;
        console.log("userDetailsController : deleteUserDetails :: Deleting user with userId" + userId);
        await userDetails.update(
            {
                isDeleted: true,
            },
            { where: { userId: userId } }
        );
        console.timeEnd("userDetailsController : deleteUserDetails");
        res.status(200).json();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getuserDetailsList,
    getuserDetails,
    createUserDetails,
    updateUserDetails,
    deleteUserDetails,
}
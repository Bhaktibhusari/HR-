let userAttendence = require("../models/userAttendenceModel.js");

let getuserAttendenceList = async (req, res, next) => {


    try {
        console.time("userAttendenceController : getuserAttendenceList");
        const data = await userAttendence.findAll(
            {
                where: { isDeleted: false },
                raw: true,
            });
        let noOfRecords = data.length;
        console.timeEnd("userAttendenceController : getuserAttendenceList");
        res.status(200).json({
            noOfRecords: noOfRecords,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

let getuserAttendence = async (req, res, next) => {
    try {
        console.time("userAttendenceController : getUserAttendence");
        const userId = req.params.id;
        console.log("userController : getUser :: userId is:", userId)
        const data = await userAttendence.findOne(
            {
                where: { id: userId, isDeleted: false },
                raw: true,
                attributes: [
                    'id', 'date', 'login', 'logout', 'attendstatus', 'description', 'hrapproval',
                ]
            });

        console.log(data);
        console.timeEnd("userAttendenceController : getuserAttendence");
        res.status(200).json({
            data: data,
        })
    } catch (err) {
        next(err);
    }
};


let createUserAttendence = async (req, res, next) => {

    try {
        const { date, login, logout, attendstatus, description, hrapproval, userId } = req.body;

        // const isUserExists = await userAttendence.findOne({ where: { userId: userId } });
        // console.log("userAttendenceController : createUserAttendence :: isUserExists : ", isUserExists);


        // if (isuserIdExists) {
        //     res.status(409).json({
        //         error: false,
        //         message: "User already exits..",
        //         data: null
        //     });
        // } else
        //  {
        // res.status(500).json({
        //     error: true,
        //     message: "User attendence failed retry after sometime..",
        //     data: {
        //         date,
        //         login,
        //         logout,
        //         attendstatus,
        //         description,
        //         hrapproval,
        //         userId,
        //     }

        // });
        // if (noOfRecords < 1) {
        //     res.status(409).json({
        //         error: false,
        //         message: "..",
        //         data: null
        //     })
        // } else {

        // }

        const data = await userAttendence.create({
            date,
            login,
            logout,
            attendstatus,
            description,
            hrapproval,
            userId,
        })

        res.status(200).json({
            data: data,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};


let updateUserAttendence = async (req, res, next) => {
    try {
        const { id, date, login, logout, attendstatus, description, hrapproval, userId } = req.body;

        console.log("userAttendenceController : updateUserAttendence :: userId :", userId);
        const userAttendenceData = await userAttendence.findOne({ where: { userId: userId } });

        if (!userAttendenceData) {
            res.status(409).json({
                error: true,
                message: "User does not exists..",
                data: null
            });
        } else {
            const updateData = await userAttendence.update(
                {
                    id,
                    date,
                    login,
                    logout,
                    attendstatus,
                    description,
                    hrapproval,
                    userId,
                },
                {
                    where: { userId: userId },
                });

            console.log("userAttendenceController : updateUserAttendence", updateData);
            res.status(200).json({
                id: id,
                date: date,
                login: login,
                logout: logout,
                attendstatus: attendstatus,
                description: description,
                hrapproval: hrapproval,
            })
        }
    } catch (err) {
        next(err);
    }
}

let deleteUserAttendence = async (req, res, next) => {
    try {
        console.time("userAttendenceController : deleteUserAttendence");
        let { userId } = req.params;
        console.log("userAttendenceController : deleteUserAttendence :: Deleting user with userId" + userId);
        await userAttendence.update(
            {
                isDeleted: true,
            },
            { where: { userId: userId } }
        );
        console.timeEnd("userAttendenceController : deleteUserAttendence");
        res.status(200).json();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getuserAttendenceList,
    getuserAttendence,
    createUserAttendence,
    updateUserAttendence,
    deleteUserAttendence,
}
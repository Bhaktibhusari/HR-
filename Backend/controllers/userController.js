let user = require("../models/userModel");

// @param {*} req
// @param {*} res
// @param {*} next

let getUserList = async (req, res, next) => {

    try {

        console.time("userController : getUserList");
        const data = await user.findAll(
            {
                where: { isDeleted: false },
                raw: true,
            });
        let noOfRecords = data.length;
        console.timeEnd("userController : getUserList");
        res.status(200).json({
            noOfRecords: noOfRecords,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

let getUser = async (req, res, next) => {
    try {
        console.time("userController : getUser");
        const userId = req.params.id;
        console.log("userController : getUser :: userId is :", userId);
        const data = await user.findOne(
            {
                where: { id: userId, isDeleted: false },
                raw: true,
                attributes: [
                    'id', 'first_name', 'last_name', 'email', 'role', 'joinDate', 'password', 'confirmPassword'
                ]
            });
        console.timeEnd("userController : getUser");
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

let createUser = async (req, res, next) => {
    console.log("lllllllllllllllllllllllllll")
    try {
        const { first_name, last_name, email, role, joinDate, password } = req.body;
        // console.log(req.body);
        const isUserExists = await user.findOne({ where: { email: email } });
        // console.log("isUserExists", isUserExists);
        // console.log("userController : createUser :: isUserExists :", isUserExists);

        if (isUserExists) {
            res.status(409).json({
                error: true,
                message: "User with email already exists..",
                data: null
            });
        } else {
            const data = await user.create({
                first_name,
                last_name,
                email,
                role,
                joinDate,
                password
            })
            console.log(data);
            res.status(200).json({
                data: data,
            });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

let updateUser = async (req, res, next) => {
    try {
        const { id, first_name, last_name, email, role, joinDate, password, confirmPassword } = req.body;

        console.log("userController : updateUser :: id : ", id);
        const userData = await user.findOne({ where: { id: id } });


        if (!userData) {
            res.status(404).json({
                error: true,
                message: "User does not exists..",
                data: null
            });
        } else {
            const updateData = await user.update(
                {
                    first_name,
                    last_name,
                    email,
                    role,
                    joinDate,
                    password,
                    confirmPassword
                },
                {
                    where: { id: id },
                });

            console.log("userController : updateUser", updateData);
            res.status(200).json({
                first_name: first_name,
                last_name: last_name,
                email: email,
                role: role,
                joinDate: joinDate,
                password: password,
                confirmPassword: confirmPassword
            })
        }
    } catch (err) {
        next(err);
    }

}


let deleteUser = async (req, res, next) => {
    try {
        console.time("userController : deleteUser");
        let { id } = req.params;
        console.log("userController : deleteUser :: Deleting user with id " + id);
        await user.update(
            {
                isDeleted: true,
            },
            { where: { id: id } }
        );
        console.timeEnd("userController : deleteUser");
        res.status(200).json();
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createUser,
    getUserList,
    getUser,
    updateUser,
    deleteUser,
};
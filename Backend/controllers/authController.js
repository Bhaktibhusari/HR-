const moment = require('moment');
const companyHoliday = require('../models/companyHolidayModel.js');
const { Op } = require("sequelize");
let user = require("../models/userModel.js");

// const signin = async (req, res, next) => {
//     try {
//         console.time("authController : signin");
//         let { email, password } = req.body;
//         console.log("authController : signin :: email ", email);
//         email = email.toLowerCase();
//         console.log("authController : signin :: email is ", email);
//         console.log("helooooooooooooooooooooooooooooooooooo")
//         // let userData = await user.findOne({ where: { email: email } });
//         const today = new Date();
//         console.log(today);
//         const formattedDate = moment(today).format('YYYY-MM-DD');
//         console.log(formattedDate);
//         const isholidayDateExists = await companyHoliday.findOne({
//             where: {
//                 holidayDate: {
//                     [Op.eq]: formattedDate,
//                 }
//             }
//         });
//         console.log(isholidayDateExists);

// if (userData) {
//     const isholidayDateExists = await companyHoliday.findOne({
//         where: {
//             holidayDate: {
//                 [Op.eq]: new Date,
//             }
//         }
//     });

//     if (!isholidayDateExists) {

//         const { id, firstName, lastName, email, password, role } = userData;

//         let isPasswordValid = await bcrypt.compare(req.body.password, password);
//         console.log("authController : signin :: isPasswordValid : ", isPasswordValid);

//         if (isPasswordValid) {
//             // jwt
//             const payload = { firstName, email, role };
//             const token = jwt.sign(payload, "thisissecreateKey", { expiresIn: "24hr" });

//             res.status(200).json({
//                 id,
//                 firstName,
//                 lastName,
//                 email,
//                 role,
//                 token: token
//             })

//         } else {
//             res.status(403).json({
//                 error: true,
//                 message: 'Invalid Password',
//                 data: null
//             })
//         }

//     } else {
//         res.status(403).json({
//             error: true,
//             message: 'Today is a holiday, Please contact Admin',
//             data: null
//         });

//     }

// } else {
//     res.status(401).json({
//         error: true,
//         message: 'Invalid Email',
//         data: null
//     })
// }
//     } catch (err) {
//         next(err)
//     } finally {
//         console.timeEnd("authController : signin");
//     }
// }

let signIn = async (req, res, next) => {
    console.log(req.body);
    try {
        let { email, password } = req.body;
        const isUserExists = await user.findOne({ where: { email: email } });

        if (isUserExists) {
            if (isUserExists.dataValues.password === password) {
                res.status(200).json({
                    message: "Login Successfull",
                });
            } else {
                res.status(409).json({
                    error: true,
                    message: "Incorrect Username & password",
                    data: null
                });
            }
            // const isUserExists = await user.findOne({ where: { email: email } });

        } else {
            res.status(409).json({
                error: true,
                message: "User does not exist",
                data: null
            });
        }

    } catch (err) {

    }
}

let signUp = async (req, res, next) => {

    console.log(req.body);

    try {
        const { first_name, last_name, email, password } = req.body;
        console.log(req.body);
        const isUserExists = await user.findOne({ where: { email: email } });
        console.log("hbijhjkhk", isUserExists);

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
                password,
            })
            console.log(data);
            res.status(200).json({
                data: data,
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signUp,
    signIn,
}
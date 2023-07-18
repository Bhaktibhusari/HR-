var createError = require('http-errors');
var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var logger = require("morgan");
// const Sequelize = require("sequelize");
var user = require("./models/userModel.js");
var userDetails = require("./models/userDetailsModel.js");
var userAttendence = require("./models/userAttendenceModel.js");
var companyHoliday = require("./models/companyHolidayModel.js");
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with the appropriate origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())


let userRouter = require("./routes/userRouter.js");
let userAttendenceRouter = require("./routes/userAttendenceRouter.js");
let userDetailsRouter = require("./routes/userDetailsRouter.js");
let companyHolidayRouter = require("./routes/companyHolidayRouter.js");

app.use("/auth", userRouter);
// app.use("/user", userRouter);
app.use("/userAttendence", userAttendenceRouter);
app.use("/userDetails", userDetailsRouter);
app.use("/companyHoliday", companyHolidayRouter);

app.use(cors());



app.use(function (req, res, next) {
    next(createError(401));
});


app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})


app.listen(3000, () => {
    console.log('PORT listening at', PORT);
});

// sequelize.sync({ force: true })
//     .then(result => {
//         app.listen(3000, () => {
//             console.log('PORT listening at', PORT);
//         })
//     }).catch(err => {
//         console.log(err);
//     })


module.exports = app;
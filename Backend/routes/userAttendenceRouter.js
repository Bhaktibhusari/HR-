let express = require('express');
let router = express.Router();
let userAttendenceController = require("../controllers/userAttendenceController");


router.get('/', userAttendenceController.getuserAttendenceList);

router.get('/:id', userAttendenceController.getuserAttendence);

router.post('/', userAttendenceController.createUserAttendence);

router.patch('/', userAttendenceController.updateUserAttendence);

router.delete('/', userAttendenceController.deleteUserAttendence);



module.exports = router;
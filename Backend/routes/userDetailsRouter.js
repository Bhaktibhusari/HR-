let express = require("express");
let router = express.Router();
let userDetailsController = require("../controllers/userDetailsController");


router.get('/', userDetailsController.getuserDetailsList);

router.get('/', userDetailsController.getuserDetails);

router.post('/', userDetailsController.createUserDetails);

router.patch('/', userDetailsController.updateUserDetails);

router.delete('/', userDetailsController.deleteUserDetails);


module.exports = router;
let express = require('express');
let router = express.Router();
let authController = require('../controllers/authController');
let usercontroller = require('../controllers/userController.js');



router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);


////////////////////////////////////////////////////////////////////////

router.get('/user', usercontroller.getUserList);
router.get('/user/:id', usercontroller.getUser);
router.post('/user', usercontroller.createUser);
router.patch('/user', usercontroller.updateUser);
router.delete('/user/:id', usercontroller.deleteUser);


module.exports = router;
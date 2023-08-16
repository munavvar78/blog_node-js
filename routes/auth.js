const express=require('express');
const router=express.Router();
const registerData=require('../controller/auth/auth.validator')
const AuthController = require('../controller/auth/auth.controller');
const authMiddlewear = require('../middlewear/authMiddlewear');

router.route('/register',registerData).post(AuthController.register)

router.route('/login').post(AuthController.login)

router.route('/logout').put(authMiddlewear.protect,AuthController.logout)
router.route('/forgetPassword').put(authMiddlewear.protect,AuthController.forgetPassword)

module.exports=router;
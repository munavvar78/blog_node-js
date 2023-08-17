const express=require('express');

const { getAlluser } = require('../controller/user/user.controller');

const { getOneuser } = require('../controller/user/user.controller');
const { protect } = require('../middlewear/authMiddlewear');

const router=express.Router();

router.route('/getAll').get(protect,getAlluser)

router.route('/getOne/:id').get(protect,getOneuser)

module.exports=router
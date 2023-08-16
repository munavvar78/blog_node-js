const expres=require("express");
const postController = require("../controller/post/post.controller");
const { protect } = require("../middlewear/authMiddlewear");
const router=expres.Router();

router.route('/post').post(protect,postController.PostSubmit);
router.route('/getPost/:id').get(protect,postController.getPost);

module.exports=router
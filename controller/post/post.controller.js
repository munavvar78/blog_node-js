const asyncHandler = require("express-async-handler");
const post = require("../../model/post");
const { PostValidator } = require("./post.validator");

const PostSubmit=asyncHandler(async(req,res)=>{
    const { error, value } = PostValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const Post_Data=await post.create({
        title:value.title,
        content:value.content,
        author:req.users._id,
    })
    if(Post_Data){
        res.status(200).json({
            message:"Your Post Create Scuffully", post:Post_Data
        })
    }else{
        res.status(400).json({
            message:"Can't Created Post"
        })
    }
})
module.exports={PostSubmit}
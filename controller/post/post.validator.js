const Joi=require('joi');

const PostValidator= Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().required(),
  });
  
module.exports={PostValidator}
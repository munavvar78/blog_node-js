const asyncHandler = require("express-async-handler");
const ObjectId = require("mongodb").ObjectId;
const User = require("../../model/user");
const jwt = require("jsonwebtoken");
const getAlluser = asyncHandler(async (req, res) => {
 
      const users = await User.find({});
      if (users) {
        res.send({ users });
      } else {
        res.json({ message: "Users Does Not Found" });
      } 
    
  }
);
const getOneuser = asyncHandler(async (req, res) => {
  console.log(req.users);
      const user = await User.findOne({ _id: req.users._id });
      if (user) {
        res.json({ user, message: "succefulle" });
      } else {
        res.json({ message: "User Does Not Found" });
      }
    }
  
);

module.exports = { getAlluser, getOneuser };

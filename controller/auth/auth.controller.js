const asyncHandler = require("express-async-handler");
const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const { registerData } = require("./auth.validator");
const { transporter } = require("../../config/nodemailer");

const register = asyncHandler(async (req, res) => {
  const { error, value } = registerData.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);
    console.log(req.body.name);
    User.findOne({ name: req.body.name }).then(async (data) => {
      if (data) {
        res.send("User Already Exists");
      } else {
        try {
          const user = await User.create({
            name: value.name,
            email: value.email,
            password: hash,
          });
          const mailOptions = {
            from: "munavvarpopatiya777@gmail.com",
            to: user.email,
            subject: 'Registration Confirmation',
            text: `Welcome to our website, ${user.name}! Your registration was successful.`,
          };
          await transporter.sendMail(mailOptions);
          res.status(200).json({ message: 'Registration successful',user:user });

        } catch (error) {
          console.error('Error during registration:', error);
          res.status(500).json({ message: 'An error occurred during registration' });
        }
        
       
      }
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (user) {
    if (isMatch) {
      user.isLoggedIn = true;
      await user.save();
      const toekns = jwt.sign({ _id: user._id }, "mynameismunavvarpopatiya");
      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          tokens: toekns,
        },
        message: "succefully Login",
      });
    } else {
      res.send("Password Is Not Match");
    }
  } else {
    res.send({ message: "User Not Login" });
  }
});
const logout = asyncHandler(async (req, res) => {
  console.log(req.users);
  try {
    const user = await User.findOneAndUpdate(new ObjectId(req.users._id), {
      isLoggedIn: false,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Logout successful", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});
const forgetPassword=asyncHandler(async(req,res)=>{
  
 
  const isMatch = await bcrypt.compare(req.body.password, req.users.password);
  if(isMatch){
    res.status(400).json({message:"please change Your password"})
  }else{

  
  const user=await User.findOneAndUpdate(new ObjectId(req.users._id),
  {password:hash},{new:true})
  if(user){
   return res.status(200).json({message:"user Password Is Updatedd" ,user:user})
  }}
})
module.exports = { register, login, logout ,forgetPassword};

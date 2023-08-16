const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt')

const user=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isLoggedIn:{
        type:Boolean,
        default:true
    }
    
})
// user.methods.generatedAuthToken=async function(){
//     try{
//         this.tokens=jwt.sign({_id:this._id},"mynameismunavvarjarjisbhaipopatiya")
//         await this.save();
//         return this.tokens
//     }
//     catch(error){
//         // res.send("the error part"+ error)
//         console.log("the error part"+ error)
//     }
// }
// user.pre("save", function(next){
//     this.password= bcrypt.hash(this.password, 10)
//     next()
// })
const User=new mongoose.model("User",user)
module.exports=User;
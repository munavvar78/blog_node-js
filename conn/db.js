const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/token').then(()=>{
    console.log(`Connection Succesful..`)
}).catch((e)=>{
    console.log(`no Connection..`)
})
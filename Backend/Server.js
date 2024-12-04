const { default: mongoose } = require("mongoose");
const app=require("./app")
const obgoose=require("mongoose")
require("dotenv").config();
const port=process.env.PORT;
(async()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connceted Ditabase")
})()

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


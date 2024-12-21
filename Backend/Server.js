const { default: mongoose } = require("mongoose");
const app=require("./app")
const obgoose=require("mongoose")
require("dotenv").config();
const port=process.env.PORT;
(async()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connceted Ditabase")
})()

app.get("/", (req, res) => {
    console.log("Token =>",req.headers("Authorization").split(" ")[1]);
    res.json({ message: "Ok" });
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})



// app.get("/", (req, res) => {
//   console.log("Token =>", req.header("Authorization").split(" ")[1]);
//   res.json({ message: "Ok" });
// });

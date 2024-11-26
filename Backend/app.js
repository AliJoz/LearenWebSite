
const express = require("express")
const app = express();
const cors=require('cors');
const path =require('path');
const bodyParsers=require('body-parser')
const ControlUser= require("./routes/auth");
app.use(
    '/courses/covers',
    express.static(path.join(__dirname,"public","courses","covers"))
)
app.use(cors());
app.use(bodyParsers.urlencoded({ extended: false }));
app.use(bodyParsers.json());


app.use('/v1/auth',ControlUser)






module.exports = app;

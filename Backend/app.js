const bodyParser = require("body-parser");
const express=requier("express")
const app = express();
const cors=requier('cors');
const path =requier('path');
const bodyParser=requier('bodyParser')
const ControlUser= require("./routes/auth");
app.use(
    '/courses/covers',
    express.static(path.join(__dirname,"public","courses","covers"))
)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/v1/auth',ControlUser)






module.exports = app;

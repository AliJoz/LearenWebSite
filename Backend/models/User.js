const mongoos = require("mongoose");

const Schima = new mongoos.schima({
  username: {
    Type: string,
    require: true,
  },
  name: { Type: string, require: true },
  Email: { Type: string, require: true, unique: true },
  password: { Type: string, require: true },
  passcret: { Type: string, require: true },
  phone: {
    Type: string,
    require: true,
  },
  role: {
    type: string,
    default:"USER",
    enum: ["ADMIN", "USER"],
  },
}, {timestamps:true});

const model=mongoos.model("USER",Schima)
module.exports=mongoos.model;
const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255 },
    username:{type:"string", min: 3, max: 100},
    email:{type:"email" ,required: true,},
    Password:{type:"string", min: 8, max: 24 },
    confirmPassword:{ type: "equal", field: "Password" },
    phone: { type: "string", length: 11},
 $$strict:"true",
};

const check = v.compile(schema);

module.exports = check;
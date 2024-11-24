const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255 },
    username:{type:"string", min: 3, max: 100},
    Email:{type:"email" ,min: 10, max: 100 },
    Password:{type:"string", min: 8, max: 24 },
    confirmPassword:{type:"equal",field: "password"},
    phone: { type: "string", length: 11},
    status: "boolean" 
};

const check = v.compile(schema);


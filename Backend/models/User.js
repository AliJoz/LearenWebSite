const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    username: {
      type: "string",
      required: true,
    },
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true, 
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, },
    password: { type: "string", required: true },
    confirmPassword: { type: "string", required: true },
    phone: {
      type: "string",
      required: true,
       match: /^[0-9]{11}$/
    },
    role: {
      type: "string",
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
  },
  { timestamps: true }
);

const model = mongoose.model("USER", schema);
module.exports = model;

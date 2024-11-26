const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    username: {
      type: "string",
      required: true,
    },
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    passcret: { type: "string", required: true },
    phone: {
      type: "string",
      required: true,
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

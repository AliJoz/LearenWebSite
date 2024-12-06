const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    phone: {
      type: "string",
      required: true,
    },
    
  },
  { timestamps: true }
);

const model = mongoose.model("BanPhone", schema);
module.exports = model;

const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    support: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String, // complete - presell - ...
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Category", // نام مدل مرتبط
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "USER", // باید نام مدل مرتبط باشد
      required: true,
    },
  },
  { timestamps: true }
);

// تعریف ویژگی‌های مجازی برای ارتباط با مدل‌های دیگر
schema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

// ثبت مدل
const model = mongoose.model("Course", schema);

module.exports = model;

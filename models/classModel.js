const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/K15");

const ClassSchema = mongoose.Schema(
  {
    className: String,
    teacher: { type: String, ref: "user" },
    studentList: [
      {
        student: { type: String, ref: "user" },
        attend: Number,
      },
    ],
  },
  { collection: "class" }
);

const ClassModel = mongoose.model("class", ClassSchema);

module.exports = ClassModel;

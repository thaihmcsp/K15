const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/K15");

const UserSchema = mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    passport: { type: String, ref: "passport" },
    age: { type: Number },
    vehical: [
      {
        name: String,
        price: Number,
      },
    ],
    classList: [{ type: String, ref: "class" }],
    role: String,
  },
  { collection: "user" }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

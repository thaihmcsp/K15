const express = require("express");
const router = express.Router();
const ClassModel = require("../models/classModel");
const UserModel = require("../models/userModel");
router.get("/", async function (req, res) {
  try {
    const classList = await ClassModel.find();
    res.json(classList);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/:id", function (req, res) {
  ClassModel.find()
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.post("/", async function (req, res) {
  try {
    const user = await UserModel.findOne({
      username: req.query.username,
      password: req.query.password,
    });
    if (user) {
      if (user.role === "teacher") {
        const newClass = await ClassModel.create({ className: "K21" });
        res.json({ newClass, mess: "tạo class thành công" });
      } else {
        res.json("bạn không có quyền tạo class");
      }
    } else {
      res.json("sai user, pass");
    }
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", function (req, res) {
  UserModel.findOne({
    username: req.query.username,
    password: req.query.password,
  })
    .then(function (data) {
      if (data) {
        if (data.role === "teacher") {
          return ClassModel.updateOne(
            { _id: req.params.id },
            {
              className: "K15",
            }
          );
        } else {
          res.json("ban khong co quyen update class");
        }
      } else {
        res.json("sai user, pass");
      }
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;

// khi tạo lớp học thì yêu cầu user, password
// nếu user là teacher thì cho tạo class
// nếu user là student thì không cho phép tạo class

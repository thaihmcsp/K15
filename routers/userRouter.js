const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");

router.get("/", function (req, res) {
  UserModel.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/page/:page", async function (req, res) {
  try {
    const view = req.query.view;
    const page = req.params.page;
    const data = await UserModel.find()
      .skip((page - 1) * view)
      .limit(view * 1);
    res.json({ data, status: 200, mess: "thanh cong" });
  } catch (error) {
    res.json({ error, status: 500, mess: "loi server" });
  }
});

router.get("/getUserByClass/:idClass", async function (req, res) {
  try {
    const listUser = await UserModel.find({ classList: req.params.idClass });
    res.json({ listUser, status: 200, mess: "thanh cong" });
  } catch (error) {
    console.log(error);
    res.json({ error, status: 500, mess: "loi server" });
  }
});

router.get("/pageUserByClass/:idClass/:page", async function (req, res) {
  try {
    const view = req.query.view;
    const page = req.params.page;

    const listUser = await UserModel.find({ classList: req.params.idClass })
      .skip((page - 1) * view)
      .limit(view * 1);
    res.json({ listUser, status: 200, mess: "thanh cong" });
  } catch (error) {
    res.json({ error, status: 500, mess: "loi server" });
  }
});

router.get("/:id", function (req, res) {
  UserModel.findOne({ _id: req.params.id })
    .then(function (data) {
      if (data) {
        res.json({ status: 200, mess: "da dang nhap" });
      } else {
        res.json({ status: 400, mess: "khong hop le" });
      }
    })
    .catch(function (err) {
      res.json({ err, status: 500, mess: "loi server" });
    });
});

router.post("/", function (req, res) {
  UserModel.findOne({ username: req.body.username })
    .then(function (data) {
      if (data) {
        res.json("username da su dung");
      } else {
        return UserModel.create(req.body);
      }
    })
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.post("/login", async function (req, res) {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      res.json({ user, status: 200 });
    } else {
      res.json({ mess: "sai username, password", status: 400 });
    }
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", function (req, res) {
  UserModel.updateOne(
    {
      _id: req.params.id,
      username: req.query.username,
      password: req.query.password,
    },
    {
      password: req.query.newPass,
    }
  )
    .then(function (data) {
      if (data.matchedCount !== 0) {
        res.json("doi mk thanh cong");
      } else {
        res.json("nhap sai user, pass");
      }
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.delete("/:id", function (req, res) {
  UserModel.deleteOne({ _id: req.params.id })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;

// xem danh sách học sinh
// kiểm tra username password nếu đúng là user thì mới cho phép xem danh sách user

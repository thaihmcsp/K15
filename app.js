const express = require("express");
const path = require("path");
const app = express();
const UserRouter = require("./routers/userRouter");
const ClassRouter = require("./routers/classRouter");
const IndexRouter = require("./routers/indexRouter");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/publics", express.static(path.join(__dirname, "./publics")));

app.use("/user", UserRouter);
app.use("/class", ClassRouter);
app.use("/", IndexRouter);

app.listen(3000);

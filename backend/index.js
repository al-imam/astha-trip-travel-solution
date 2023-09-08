const express = require("express");

const sequelize = require("./db/config");
require("./db/models");

const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const path = require("path");
const MainRouter = require("./routers/router");
var bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", MainRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use((err, req, res, next) => {
  console.log(err);
  // handel erroe heare
  if (res.headersSent) {
    next("some thing wrong");
  } else {
    if (err.message) {
      if (err.instanceof === "multer") {
        return res.status(406).send(err.message);
      } else if (err.instanceof === "unauthorised login") {
        return res.status(401).send(err.message);
      } else if (err.instanceof === "not auth") {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("sort", "", {
            maxAge: 10,
            sameSite: "strict",
            path: "/",
          })
        );
        return res.status(401).send(err.message);
      } else if (err.instanceof === "loiadd") {
        return res.status(501).send(err.message);
      } else {
        return res.status(500).send(err.message);
      }
    } else {
      res.status(500).send("error from handler in main index");
    }
  }

  // console.log("🚀 ~ file: index.js:21 ~ app.use ~ err:", err)
  // res.send(err)
});

const logging = (msgs) => console.log("\x1b[36m", msgs, "\x1b[0m \n");

sequelize.sync({ force: true, logging }).then(() => {
  const port = process.env.PORT ?? 5000;
  app.listen(port);
  console.log(`server started on port: ${port}`);
});

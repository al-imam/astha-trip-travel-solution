const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const cookie = require("cookie");
const path = require("path");
// import main  router
const MainRouter = require("./routers/router");
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// setup ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// set public
app.use(express.static(path.join(__dirname, "public")));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// main middelware
app.use("/", MainRouter);

// if not in production use the port 5000

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use((err, req, res, next) => {
  // handel erroe heare
  if (res.headersSent) {
    next("some thing wrong");
  } else {
    if (err.message) {
      if (err.instanceof === "multer") {
        return res.status(406).send(err.message);
      } else if (err.instanceof === "unauthorized login") {
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
const PORT = process.env.PORT || 5000;
console.log("server started on port:", PORT);
app.listen(PORT);

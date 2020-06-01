let express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const staticAsset = require("static-asset");
const router = require("./routes");
const config = require("./config");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// EJS
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
// express static
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", router.start);
app.use("/basics", router.basics);
app.use("/fundamentals", router.fundamentals);
app.use("/mytests", router.mytests);

// app listen
app.listen(config.PORT, () => {
  console.log(`app listen port ${config.PORT}`);
});

const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "THREE JS MAIN PAGE",
  });
});

module.exports = router;

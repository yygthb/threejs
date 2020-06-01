const { Router } = require("express");
const router = Router();

router.get("/fundamentals", (req, res) => {
  res.render("basics/fundamentals", {
    title: "Базовые принципы",
  });
});

router.get("/responsive-design", (req, res) => {
  res.render("basics/responsive", {
    title: "Адаптивный дизайн",
  });
});

router.get("/primitives", (req, res) => {
  res.render("basics/primitives", {
    title: "Примитивы Three.js",
  });
});

module.exports = router;

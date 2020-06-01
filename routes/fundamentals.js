const { Router } = require("express");
const router = Router();

router.get("/primitives", (req, res) => {
  res.render("fundamentals/primitives", {
    title: "Примитивы Three.js",
  });
});

router.get("/scenegraph", (req, res) => {
  res.render("fundamentals/scenegraph", {
    title: "Граф сцены Three.js",
  });
});

router.get("/materials", (req, res) => {
  res.render("fundamentals/materials", {
    title: "Материалы Three.js",
  });
});

router.get("/lights", (req, res) => {
  res.render("fundamentals/lights", {
    title: "Материалы Three.js",
  });
});

module.exports = router;

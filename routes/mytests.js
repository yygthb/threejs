const { Router } = require("express");
const router = Router();

router.get("/test1", (req, res) => {
  res.render("mytests/test1", {
    title: "test 1",
  });
});

router.get("/chart", (req, res) => {
  res.render("mytests/chart", {
    title: "Буква Т",
  });
});

router.get("/spheres-dom", (req, res) => {
  res.render("mytests/spheres", {
    title: "Сферы / DOM",
  });
});

router.get("/load-model", (req, res) => {
  res.render("mytests/model", {
    title: "3d models",
  });
});

router.get("/load-ty", (req, res) => {
  res.render("mytests/ty", {
    title: "3d TY",
  });
});

router.get("/load-tlock", (req, res) => {
  res.render("mytests/tlock", {
    title: "Т-замок (from NATA-INFO)",
  });
});

// BLENDER
router.get("/load-blender-boxes", (req, res) => {
  res.render("mytests/blender-boxes", {
    title: "Blender кубик Рубика",
  });
});
router.get("/array-obj", (req, res) => {
  res.render("mytests/array-obj", {
    title: "Массив объектов",
  });
});
router.get("/raycast1", (req, res) => {
  res.render("mytests/raycast1", {
    title: "RayRaycast1 (many objs by 1 shape)cast1",
  });
});
router.get("/raycast2", (req, res) => {
  res.render("mytests/raycast2", {
    title: "Raycast2 (1 obj with many shapes)",
  });
});
router.get("/bb2", (req, res) => {
  res.render("mytests/bb2", {
    title: "БилБорд2 (my blender objs)",
  });
});

module.exports = router;

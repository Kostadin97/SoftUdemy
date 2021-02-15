const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tutorialService = require("../services/tutorialService");

router.get("/", authMiddleware.isGuest, (req, res) => {
  tutorialService
    .getAll()
    .then((tutorials) => {
      res.render("homeUser", { title: "Browse", tutorials });
    })
    .catch(() => res.status(500).end());
});

router.get("/create", authMiddleware.isAuthenticated, (req, res) => {
  res.render("create", { title: "Create Course" });
});

router.post("/create", (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    duration: req.body.duration,
    author: req.user._id,
  };
  tutorialService
    .create(data)
    .then(() => res.redirect("/"))
    .catch(() => res.status(500).end());
});

module.exports = router;

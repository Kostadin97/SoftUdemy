const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tutorialService = require("../services/tutorialService");

router.get("/", (req, res) => {
  tutorialService
    .getAll(req.query)
    .then((tutorials) => {
      res.render("homeUser", { title: "Browse", tutorials });
    })
    .catch((err) => console.log(err));
});

router.get("/create", authMiddleware.isAuthenticated, (req, res) => {
  res.render("create", { title: "Create Course" });
});

router.get("/details/:tutorialId", async (req, res) => {
  let tutorial = await tutorialService.getOne(req.params.tutorialId);
  res.render("details", { title: "Details Page", tutorial });
});

router.get("/delete/:tutorialId", (req, res) => {
  tutorialService
    .deleteTutorial(req.params.tutorialId)
    .then(() => res.redirect("/"))
    .catch(() => res.status(500).end());
});

router.get("/edit/:tutorialId", async (req, res) => {
  let tutorial = await tutorialService.getOne(req.params.tutorialId);
  res.render("edit", { title: "Edit Tutorial", tutorial });
});

router.post("/edit/:tutorialId", (req, res) => {
  let courseId = req.params.tutorialId;
  tutorialService
    .editTutorial(courseId, req.body)
    .then(() => res.redirect(`/details/${courseId}`))
    .catch(() => res.status(500).end());
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

const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tutorialService = require("../services/tutorialService");

router.get("/", authMiddleware.isGuest, (req, res) => {
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
  const tutorial = await tutorialService.getOne(req.params.tutorialId);
  const userId = await res.locals.user._id.toString();
  const authorId = await tutorial.author.toString();

  let iHaveEnrolled = await false;
  let isAuthor = Boolean;

  try {
    if (tutorial.enrolledUsers.toString().includes(userId)) {
      iHaveEnrolled = true;
    } else {
      iHaveEnrolled = false;
    }

    isAuthor = authorId === userId ? true : false;
  } catch (error) {
    console.log(error);
  }

  res.render("details", {
    title: "Details Page",
    tutorial,
    iHaveEnrolled,
    isAuthor,
  });
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

router.get("/enroll/:tutorialId", async (req, res) => {
  let tutorial = await tutorialService.getOne(req.params.tutorialId);
  let user = await res.locals.user._id;

  tutorialService
    .enroll(tutorial._id, user)
    .then(() => res.redirect(`/details/${tutorial._id}`))
    .catch(() => res.status(500).end());
});

router.get("/like/:tutorialId", async (req, res) => {
  let tutorial = await tutorialService.getOne(req.params.tutorialId);
  let user = await res.locals.user._id;

  tutorialService
    .like(tutorial._id, user)
    .then(() => res.redirect(`/details/${tutorial._id}`))
    .catch(() => res.status(500).end());
});

router.post("/comment/:tutorialId", async (req, res) => {
  let tutorial = await tutorialService.getOne(req.params.tutorialId);
  let user = await res.locals.user._id;
  const date = new Date();

  let comment = await {
    id: user,
    commentContent: req.body,
    date: date
  };

  tutorialService
    .comment(req.params.tutorialId, comment)
    .then(() => res.redirect(`/details/${tutorial._id}`))
    .catch((err) => console.log(err));
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

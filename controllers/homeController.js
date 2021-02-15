const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  if (req.cookies["USER_SESSION"]) {
    res.render("homeUser", { title: "Home Page" });
  } else {
    res.render("homeGuest", { title: "Home Page" });
  }
});

router.get('/create', isAuthenticated, (req, res) =>{
  res.render('create', { title: 'Create Course' });
});

module.exports = router;

const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, (req, res) => {
    res.render('homeUser', { title: 'Home Page' });
});

module.exports = router;

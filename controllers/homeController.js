const router = require("express").Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.get("/", authMiddleware.isGuest, (req, res) => {
  res.render('homeUser');
});

router.get('/create', authMiddleware.isAuthenticated, (req, res) =>{
  res.render('create', { title: 'Create Course' });
});

module.exports = router;

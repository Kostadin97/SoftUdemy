const router = require("express").Router();
const authMiddleware = require('../middlewares/authMiddleware');
const tutorialService = require('../services/tutorialService');

router.get("/", authMiddleware.isGuest, (req, res) => {
  res.render('homeUser');
});

router.get('/create', authMiddleware.isAuthenticated, (req, res) =>{
  res.render('create', { title: 'Create Course' });
});

router.post('/create', (req, res) => {
  tutorialService.create(req.body)
    .then(() => res.redirect('/'))
    .catch(() => res.status(500).end());
});

module.exports = router;

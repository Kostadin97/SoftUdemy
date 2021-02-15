module.exports = (req, res, next) => {
  if (!req.user) {
    return res.render('homeGuest');
  }
  next();
};

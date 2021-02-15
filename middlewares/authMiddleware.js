const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  next();
};

const isGuest = (req, res, next) => {
  if (!req.user) {
    return res.render("homeGuest");
  }
  next();
};

module.exports = {
  isAuthenticated,
  isLoggedIn,
  isGuest,
};

const isAuth = (redirectTo = '/auth/login') => (req, res, next) => {
  if (req.currentUser) {
    next();
  } else {
    res.redirect(redirectTo);
  }
};

export default isAuth;

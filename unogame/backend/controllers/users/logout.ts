const logOut = (req, res) => {
  req.session.destroy();

  res.redirect("/");
};

export { logOut };

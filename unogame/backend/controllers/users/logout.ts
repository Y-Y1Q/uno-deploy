import HttpCode from "../../../constants/http_code";

const logOut = (req, res) => {
  try {
    req.session.destroy();
    // res
    //   .status(HttpCode.OK)
    //   .json({ message: "You have successfully logged out." });
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(HttpCode.InternalServerError).json({ error: "Logout failed" });
  }
};

export { logOut };

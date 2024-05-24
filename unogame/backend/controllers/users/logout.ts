import HttpCode from "../../../constants/http_code";

const logOut = (req, res) => {
  try {
    req.session.destroy();

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(HttpCode.InternalServerError).json({ error: "Logout failed" });
  }
};

export { logOut };

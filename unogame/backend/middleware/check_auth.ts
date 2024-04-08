import HttpCode from "../utilities/http_code";

const isAuthenticated = (req, res, next) => {
  if (req.session.user !== undefined) {
    next();
  } else {
    return res
      .status(HttpCode.Forbidden)
      .json({ error: "You are not allowed to access this page" });
  }
};

export { isAuthenticated };

const requestTime = (req, res, next) => {
  // exclude logging for bundled files requests
  if (!req.url.startsWith("/dist") && req.url !== "/favicon.ico") {
    const timestamp = new Date().toLocaleString();
    console.log(
      `\nRequest \x1b[32m\x1b[1m ${req.method} ${req.url} \x1b[0m` +
        `received at ${timestamp}`
    );
  }
  next();
};

export { requestTime };

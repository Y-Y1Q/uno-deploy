const requestTime = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(
    `\nRequest \x1b[32m\x1b[1m ${req.method} ${req.url} \x1b[0m received at ${timestamp}`
  );
  next();
};

export { requestTime };

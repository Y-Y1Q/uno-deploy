const requestTime = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`\nRequest received at ${timestamp}\n${req.method} ${req.url}`);
  next();
};

export { requestTime };

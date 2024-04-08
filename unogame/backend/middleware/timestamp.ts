const requestTime = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`\nRequest received at ${timestamp}: ${req.method}`);

  next();
};

export { requestTime };

const upperCaseNameMiddleware = (req, res, next) => {
  try {
    req.body.name = req.body.name.toUppercase();
    next();
  } catch (error) {
    res.status(400).json({ errorMessage: 'Please provide a name for the user. '})
  }
};

module.exports = {
  upperCaseNameMiddleware,
};

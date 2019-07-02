const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authorization.split(' ');
  try {
    await promisify(jwt.verify)(token, authConfig.secret);
    return next();
  } catch (error) {
    return res.status(401).json('Invalid token.');
  }
};

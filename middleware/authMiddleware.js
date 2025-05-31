const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, jwtSecret);
    console.log(verified)
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: 'Invalid token' });
  }
};

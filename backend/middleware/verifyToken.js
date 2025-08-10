const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  console.log('Token from cookie:', token); // Log the token

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: 'Invalid token' });
      }

      req.userId = decoded.userId; // Add user ID to request object
      next();
    });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;

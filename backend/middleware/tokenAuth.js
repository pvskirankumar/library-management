const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Token required");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.status(403).send("Invalid or expired token");
    req.user = user;
    next();
  });
}

function verifyGoogleAuthToken (req, res, next) {
    
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send("Access denied");
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };

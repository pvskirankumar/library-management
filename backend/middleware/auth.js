const mockTokens = {
  "admin-token": {
    id: 1,
    role: "admin",
    name: "Admin",
  },
  "user-token": {
    id: 2,
    role: "user",
    name: "Kiran",
  },
};

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send("No token provided");

  const token = authHeader.split(" ")[1];
  const user = mockTokens[token];

  if (!user) return res.status(403).send("Invalid token");

  req.user = user;
  next();
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send({
        message: "Access denied!",
      });
    }
    next();
  };
}

module.exports = { authenticate, authorizeRoles };

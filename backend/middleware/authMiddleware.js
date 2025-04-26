const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const detectTokenType = require("../util/functionUtils");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyAuthToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];  
  const token = authHeader && authHeader.split(" ")[1];

  if (!token || token === "null") {
    return res.status(401).json({ message: "No Token Provided or Invalid token." });
  }

  const tokenType = detectTokenType(token);

  try {
    if (tokenType === 'google') {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: 'user',
      };
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyAuthToken;

const detectTokenType = (token) => {
  try {
    const [headerEncoded] = token.split(".");
    const headerJson = Buffer.from(headerEncoded, "base64").toString();
    const header = JSON.parse(headerJson);

    if (header.alg === "RS256") return "google";
    if (header.alg === "HS256") return "jwt";
  } catch (error) {
    console.error('Token parsing failed:', error);
  }

  return null;
};

module.exports = detectTokenType;
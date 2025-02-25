// Fonction pour crypter les Mot de Passe
const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

const hashPassword = (req, res, next) => {
  argon2
  .hash(req.body.password, hashingOptions)
  .then((hashedPassword) => {
    
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    next();
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken
};
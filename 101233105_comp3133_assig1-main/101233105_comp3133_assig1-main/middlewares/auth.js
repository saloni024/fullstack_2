const { verify } = require("jsonwebtoken");

const UserSchema = require("../models/user");

exports.AuthMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = verify(token, process.env.SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  const authUser = await UserSchema.findById(decodedToken.id);
  if (!authUser) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = authUser;
  return next();
};

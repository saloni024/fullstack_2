const { sign } = require("jsonwebtoken");

const serializeUser = (user) => ({
  id: user._id,
  username: user.username,
  firstname: user.firstname,
  lastname: user.lastname,
  type: user.type,
  email: user.email,
});

exports.issueToken = async (user) => {
  let token = await sign(serializeUser(user), process.env.SECRET, {
    expiresIn: 3600 * 24,
  });
  return `Bearer ${token}`;
};

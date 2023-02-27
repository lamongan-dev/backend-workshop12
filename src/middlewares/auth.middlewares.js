require('dotenv').config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const AuthMiddleware = {
  async isLoggedIn(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error('No authorization header');

      const payload = await jwt.verify(token, secret);
      if (!payload) throw new Error('invalid token');

      req.user = payload;
      next();
    } catch (error) {
      const { message } = error;
      let status;

      if (message.includes('No authorization header')) {
        status = 400;
      } else if (message.includes('invalid token')) {
        status = 400;
      } else {
        status = 500;
      }

      res.status(status).json( { message });
    }
  }
}

module.exports = AuthMiddleware;

require('dotenv').config(); // ⬅️ Load variables from .env



module.exports = {
  jwtSecret: process.env.JWT_SECRET,
};

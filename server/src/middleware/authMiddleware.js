const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Provera da li postoji Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Uzimamo samo JWT token (bez "Bearer")
      token = req.headers.authorization.split(" ")[1];

      // Proveravamo da li je token validan
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pronalazimo korisnika na osnovu userId iz tokena
      req.user = await User.findById(decoded.userId).select("-password");

      // Sve je u redu, nastavi na sledeći middleware ili controller
      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

module.exports = protect;
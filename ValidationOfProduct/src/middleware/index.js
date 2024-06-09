import TokenModel from "../model/token/index.js";
import jwt from "jsonwebtoken";

const key = process.env.secret_key;

const userAuthMiddleWare = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check if the token is provided
    if (!token) {
      console.log("Token not provided");
      return res.status(400).json({ data: "UnAuthorized Access" });
    }
    console.log(token, 'token');

    // Remove "Bearer " prefix
    token = token.replace("Bearer", "");

    // Check if the token exists in the database
    const findToken = await TokenModel.findOne({
      where: {
        token: token,
      },
    });
    if (!findToken) {
      console.log("Token not found in database");
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, key);
      req.user = decoded;
      console.log("Token successfully verified", decoded);

      // Pass control to the next middleware
   
    } catch (error) {
      console.log("Token verification failed", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  next();
};

export default userAuthMiddleWare;

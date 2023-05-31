import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "test";

const auth = async (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Authentication Failed",
      error:error
    });
  }
};

export default auth;
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already Exists");
    } else {
      const createUser = await User.create({
        name,
        email,
        password,
      });
      res.json(createUser);
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      "_id name email isAdmin password"
    );
    // console.log("user", user);
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.json(user);
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

export { registerUser, loginUser };

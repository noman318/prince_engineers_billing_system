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
      //   res.json(user);
      const { email, name, isAdmin, _id } = user;
      const newUser = { email, name, isAdmin, _id };
      res.json(newUser);
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

const logOutUser = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out" });
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({}).select("-password");
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getUserByID = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).select("_id name email isAdmin");
    if (user) {
      return res.json(user);
    }
    throw new Error("User not Found");
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getAllUsers, getUserByID, logOutUser };

import User from "../models/user.model";

const registerUser = async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already Exists");
    } else {
      const createUser = await User.create({
        name,
        email,
        password,
        isAdmin,
      });
    }
  } catch (error) {
    next(error);
  }
};

import { User } from "../models/users.models.js";
// import uploadOnClodinary from "../utils/cloudinary.js";

const signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    // if (
    //   [username, fullname, email, password].some((filed) => filed.trim() === "")
    // ) {
    //   return res.status(401).json({ message: "All fileds required." });
    // }

    const userExsits = await User.findOne({ email });
    if (userExsits) {
      return res.status(401).json({ message: "User Already Exsits." });
    }

    // const avatarLocalFilePath = req.file?.path;
    // console.log(avatarLocalFilePath, "?????");

    // if (!avatarLocalFilePath) {
    //   return res
    //     .status(401)
    //     .json({ message: "Avatar Local Path are required." });
    // }

    // const avatar = await uploadOnClodinary(avatarLocalFilePath);
    // console.log(avatar, "avatar");

    const user = await User.create({
      fullname,
      username,
      email,
      password,
      //   avatar: avatar?.url,
    });

    res.status(200).json({ message: "Signup success.", user });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((filed) => filed.trim() === "")) {
      return res.status(401).json({ message: "All fileds required." });
    }

    const userExsits = await User.findOne({ email });
    if (!userExsits) {
      return res.status(401).json({ message: "Invalid email and password!" });
    }

    const matchPassword = await userExsits.isCorrectPassword(password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid cridential!" });
    }

    const token = await userExsits.genrateToken();

    const loggedInUser = await User.findById(userExsits._id).select(
      "-password"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ message: "Login Success", loggedInUser, token });
  } catch (error) {
    console.log(error);
  }
};

export { signup, login };

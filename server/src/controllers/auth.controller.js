import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.utils.js";

export const register = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  const alreadyExists = await userModel.findOne({ email });

  if (alreadyExists) {
    return res.status(400).json({
      message: "User already exists",
      errors: [
        {
          path: "email",
          msg: "User already exists",
        },
      ],
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "confirm Password must be same as password.",
      errors: {
        path: "confirmPassword",
        msg: "confirm Password must be same as password.",
      },
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
  });

  // console.log(user);

  const accessToken = createAccessToken({ userId: user._id, email });
  const refreshToken = createRefreshToken({userId: user._id, email });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  res.status(201).json({
    message: "User created successfully",
    data: {
      email: user.email,
      name: user.name,
      id: user._id,
    },
    accessToken,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({ userId: user._id, email });
  const refreshToken = createRefreshToken({userId: user._id, email });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  res.cookie("refreshToken", refreshToken,
     { httpOnly: true ,
      secure: true,
    sameSite: "none",
     });

  res.status(200).json({
    message: "user logged in successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.name,
      },
      accessToken,
    },
  });
};

export const refresh = async (req, res) => {
  
  console.log("Cookies:", req.cookies);
  console.log("Refresh Token:", req.cookies.refreshToken);
  
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh Token is required",
    });
  }

// console.log(refreshToken);


  try {
    
    const decoded = readRefreshToken({ refreshToken });
    const {userId, email } = decoded;

    const user = await userModel.findById(userId)

    if (!user) {
  return res.status(404).json({ message: "User not found" });
}

    if (refreshToken != user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });

      return res.status(401).json({
        message: "RefreshToken mismatch",
      });
    }

    const accessToken = createAccessToken({ userId, email });
    const newRefreshToken = createRefreshToken({userId, email });

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true,
      secure: true,
    sameSite: "none",
     });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.status(200).json({
      message: "Token refreshed successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh Token",
    });
  }
};


export const getMe = async (req,res) => {
    const {userId, email} = req.user
    
    const user = await userModel.findById(userId)
        

    res.status(200).json({
        message:"user data fetched ",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id,

            }
        }
    })
}

export const logout = async (req,res) => {

    const {userId, email} = req.user

    await userModel.findByIdAndUpdate(userId, {
        refreshToken:null
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
    })

    return res.status(200).json({
        message:"logout successful"
    })
}
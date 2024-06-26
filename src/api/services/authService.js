// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');
const ApiError = require('../utils/ApiError');

const signup = async (userName, password) => {
  const user = await getUserbyName(userName);
  if (user) {
    throw new ApiError(400, "This User Already Exists!");
  }
  const newUser = new userModel({ userName, password });
  console.log(newUser)
  await newUser.save();
  
  // تولید JWT
  const token = generateToken(newUser._id);

  return { message: "User created successfully", token };
};

const login = async (userName, password) => {
  const user = await getUserbyName(userName);
  if (!user) {
    throw new ApiError(401, "Invalid credentials (user not found)");
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials (password is not correct)");
  }

  return user;
};

const getUserbyName = async (userName) => {
  try {
    return await userModel.findOne({ userName });
  } catch (error) {
    throw new ApiError(400, "Error in fetching user");
  }
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

async function setRefreshToken(userName) {
  const user = await getUserbyName(userName);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const token = generateToken(user.id, process.env.JWT_SECRET, '1h');
  return token
}

module.exports = {
  signup,
  login,
  getUserbyName,
  generateToken,
  setRefreshToken,
};

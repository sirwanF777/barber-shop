
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");
// const { PrismaClient } = require("@prisma/client");
// const lodash = require("lodash");
// const prisma = new PrismaClient();

require("dotenv").config();

const ApiError = require("../utils/ApiError")
const authService = require('../services/authService');
const { setRefreshToken } = require("../services/authService")


const signup = async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const { message, token } = await authService.signup(userName, password);

    // تنظیم کوکی JWT
    res.cookie('token', token, {
      httpOnly: true, // محافظت در برابر دسترسی از طریق جاوااسکریپت
      secure: process.env.JWT_SECRET === 'production', // استفاده از HTTPS در حالت تولید
      maxAge: 3600000, // 1 ساعت
    });

    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    await authService.login(userName, password);
    const token = await setRefreshToken(userName);

    res.cookie('token', token, {
      httpOnly: true, // محافظت در برابر دسترسی از طریق جاوااسکریپت
      secure: process.env.JWT_SECRET === 'production', // استفاده از HTTPS در حالت تولید
      maxAge: 3600000, // 1 ساعت
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ message: "Logged out successfully" });
};


async function getUserbyId(objectId) {
  return prisma.User.findUnique({
    where: {
      id: objectId,
    },
  });
}

async function getUserbyName(userName) {
  try {
    return userModel.findOne({userName: userName});
  } catch (error) {
    throw new ApiError(400, "User not found");
  }
}

async function setRefereshToken(userName) {
  const user = await getUserbyName(userName);
  const refreshtoken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: 3600000 * 1000 }
  );
  const accesstoken = await jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: 3600000 }
  );
  user.refreshToken = refreshtoken;
  if (await updateUser(user)) {
    return { accesstoken, refreshtoken };
  }
}

async function createUser(phone, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.User.create({
    data: {
      phone,
      password: hashedPassword,
    },
  });
  return setRefereshToken(phone);
}

async function updateUser(obj) {
  try {
    const { phone } = obj;
    console.log(obj);
    if (await getUserbyName(phone)) {
      // eslint-disable-next-line no-param-reassign
      delete obj.id;
      const user = await prisma.User.update({
        where: { phone },
        data: obj,
      });
      return omit(user);
    } else {
      throw new ApiError(400, "User not found");
    }
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}

async function deleteUser(phone) {
  try {
    const deletedPhone = `D-${phone}`;
    await prisma.User.update({
      where: { phone },
      data: {
        phone: deletedPhone,
        softDelete: true,
      },
    });
    return true;
  } catch (error) {
    throw new ApiError(400, "error while deleting");
  }
}
function omit(object) {
  if (Array.isArray(object)) {
    console.log("aray");
    return object.map((item) => omit(item));
  } else {
    console.log("non arary");
    return lodash.omit(object, ["password", "refreshToken"]);
  }
}
async function checkIfBlocked(phone) {
  const user = await getUserbyName(phone);
  return user.blocked;
}


module.exports = {
  signup,
  login,
  logout
};
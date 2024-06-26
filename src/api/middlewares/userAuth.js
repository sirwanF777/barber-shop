// middleware/checkLoggedIn.js
const jwt = require('jsonwebtoken');

const checkLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(); // اگر توکن وجود نداشته باشد، ادامه دهد
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      return res.status(400).json({ message: 'You are already logged in. Please logout first.' });
    }
  } catch (error) {
    return next(); // اگر توکن معتبر نباشد، ادامه دهد
  }

  next();
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Please login first.' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
      }
      req.userId = decoded.id; // ذخیره شناسه کاربر برای استفاده‌های بعدی
      next();
    });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token format.' });
  }
};


module.exports = {
  checkLoggedIn,
  verifyToken,

}

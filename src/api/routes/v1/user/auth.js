const express = require("express");
const {
  signup,
  login,
  logout,
} = require("../../../controllers/userControllers");
// const { isAuth } = require("../../../middlewares/isAuth.middleware");
// const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const { addUserValidation } = require("../../../validation/user/user.validation");
const { checkLoggedIn, verifyToken }= require("../../../middlewares/userAuth");


const router = express.Router();


router.post(
    "/signup",
    [checkLoggedIn ,addUserValidation, signup]
);

router.post(
    "/login",
    [checkLoggedIn, addUserValidation, login]
);

router.post(
  "/logout",
  [verifyToken, logout]
);
// router.post(
//   "/verify",
// //   validate(userAuthValidationSchema.verify),
//   async (req, res, next) => {
//     try {
//       const { phone, code, password } = req.body;
//       console.log(code);
//       const resault = await verify(phone, code, password);
//       return res.send({
//         Refresh_Token: resault.refreshtoken,
//         Access_Token: resault.accesstoken,
//       });
//     } catch (error) {
//       return next(new ApiError(error.statusCode, error.message));
//     }
//   }
// );


// router.post(
//   "/refreshToken",
//   isAuth,
//   validate(userAuthValidationSchema.refreshToken),
//   async (req, res, next) => {
//     try {
//       const { RefreshToken } = req.body;
//       const userId = await checkRefreshToken(RefreshToken);
//       const user = await getUserbyId(userId);
//       if (await checkIfBlocked(user.phone))
//         return next(new ApiError(403, "access denied! This user is blocked."));
//       if (userId) {
//         const resault = await refreshToken(userId);
//         return res.send({
//           Refresh_Token: resault.refreshtoken,
//           Access_Token: resault.accesstoken,
//         });
//       }
//     } catch (error) {
//       return next(new ApiError(error.statusCode, error.message));
//     }
//   }
// );

// router.post(
//   "/forgetpassword",
//   validate(userAuthValidationSchema.forgetPassword),
//   async (req, res, next) => {
//     try {
//       const { phone } = req.body;
//       if (await checkIfBlocked(phone))
//         return next(new ApiError(403, "access denied! This user is blocked."));
//       const resault = await forgetPassword(phone);
//       return res.send();
//     } catch (error) {
//       return next(new ApiError(error.statusCode, error.message));
//     }
//   }
// );

// router.post(
//   "/verifyforgetpassword",
//   validate(userAuthValidationSchema.verifyForgetPassword),
//   async (req, res, next) => {
//     try {
//       const { phone, code, password } = req.body;
//       const resault = await verifyForgetPassword(phone, code, password);
//       return res.send();
//     } catch (error) {
//       return next(new ApiError(error.statusCode, error.message));
//     }
//   }
// );

module.exports = router;
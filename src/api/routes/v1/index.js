const express = require("express");
const authUserV1 = require("./user/auth");
const reservationRoutes = require("./reserve/reservationRoutes")
// const authAdminV1 = require("./admin/auth");
// const uploaderV1 = require("./admin/uploader");
// const manageUserV1 = require("./admin/manageUser");
// const manageAdminV1 = require("./admin/manageAdmin");
// const courseV1 = require("./course");

const router = express.Router();


router.use("/auth-user", authUserV1);
router.use('/reservation', reservationRoutes);

// router.use("/authAdmin", authAdminV1);
// router.use("/uploader", uploaderV1);
// router.use("/manageUser", manageUserV1);
// router.use("/manageAdmin", manageAdminV1);
// router.use("/course", courseV1());

module.exports = router;
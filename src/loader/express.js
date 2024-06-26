const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

const express = require("express");
const routes = require("../api/routes");
// const httpstatus = require("http-status-codes");
// const cors = require("cors");
// const path = require("path");
const errorHandler = require("../api/middlewares/errorHandling");
const ApiError = require("../api/utils/ApiError")

const expressLoader = async (app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(bodyParser.json());
  
  // app.use(express.static(path.join(__dirname, "../media")));
  // app.use(
  //   cors({
  //     origin: "*",
  //   })
  // );

  app.use("/api", routes);

  app.use((req, res, next) => {
    const err = new ApiError(404, "Not Found");
    next(err);
  });

  app.use(errorHandler);
};

module.exports = expressLoader;
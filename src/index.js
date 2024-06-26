const express = require("express");
const app = express();

require('dotenv').config();

require("./boot")
// require("./api/middlewares")(app);

require("./loader")(app);

require("./api/middlewares/404")(app);


async function startServer () {
  await app.listen(process.env.APP_PORT, () => {
    console.log(`on port ${process.env.APP_URL}`);
  });
};

startServer();
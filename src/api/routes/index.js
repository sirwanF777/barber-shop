const express = require('express');
const router = express.Router();

const v1Loader = require('./v1');


router.use('/v1', v1Loader);


module.exports = router;
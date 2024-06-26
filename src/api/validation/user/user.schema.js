const joi = require("joi");

const schema = {
    user: joi.object ({
        userName: joi.string().min(3).max(30).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required()
    })
};


module.exports = schema;
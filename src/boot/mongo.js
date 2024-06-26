const mongoose = require("mongoose");

const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;


mongoose.connection.on(`error`, (error) => {
    console.log(`MongoDB connection error: ${error}`);
});

const startMongoDB = () => {
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`);
};

module.exports = startMongoDB;
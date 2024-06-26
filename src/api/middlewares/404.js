module.exports = (app) => {
    app.use((req, res, next) => {
        res.send({
            status: 404,
            code: `Not Found`,
            message: `Requested resource could not be found`
        });
    });
};
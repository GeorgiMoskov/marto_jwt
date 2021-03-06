const config = (function () {
    const PORT = 8000;
    const JWT_SECRET = 'xxx';
    const JWT_ISS = 'telerik';
    const JWT_EXPIRE_TIME = 30; // in seconds

    return {
        PORT,
        JWT_SECRET,
        JWT_ISS,
        JWT_EXPIRE_TIME,
    }
})();

module.exports = {
    PORT: config.PORT,
    JWT_SECRET: config.JWT_SECRET,
    JWT_ISS: config.JWT_ISS,
    JWT_EXPIRE_TIME: config.JWT_EXPIRE_TIME
};
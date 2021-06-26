class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.massage = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
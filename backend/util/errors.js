class NotFoundError {
    constructor(message) {
        this.message = message;
        this.status = 400;
    }
};

class NotAuthError {
    constructor(message) {
        this.message = message;
        this.status = 401;
    }
}

exports.NotFoundError = NotFoundError;
exports.NotAuthError = NotAuthError;
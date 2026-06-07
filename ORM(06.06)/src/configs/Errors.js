exports.ConflictCollection = {
    ConflictError: class extends Error {
        constructor(message) {
            super(message);
            this.name = 'ConflictError';
        }
    },
    isConflictError(err) {
        return err instanceof this.ConflictError;
    }
}

exports.RequestCollection = {
    RequestError: class extends Error {
        constructor(message,statusCode) {
            super(message);
            this.name = 'RequestError';
            this.statusCode = statusCode;
        }
    },
    isRequestError(err) {
        return err instanceof this.RequestError;
    }
}
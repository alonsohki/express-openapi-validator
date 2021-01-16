"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.Unauthorized = exports.UnsupportedMediaType = exports.InternalServerError = exports.RequestEntityTooLarge = exports.BadRequest = exports.MethodNotAllowed = exports.NotAcceptable = exports.NotFound = exports.HttpError = exports.Ajv = exports.OpenApiContext = exports.OpenApiSpecLoader = exports.OpenAPIFramework = void 0;
const ajv_1 = require("./ajv");
var framework_1 = require("./framework");
Object.defineProperty(exports, "OpenAPIFramework", { enumerable: true, get: function () { return framework_1.OpenAPIFramework; } });
var openapi_spec_loader_1 = require("./openapi.spec.loader");
Object.defineProperty(exports, "OpenApiSpecLoader", { enumerable: true, get: function () { return openapi_spec_loader_1.OpenApiSpecLoader; } });
var openapi_context_1 = require("./openapi.context");
Object.defineProperty(exports, "OpenApiContext", { enumerable: true, get: function () { return openapi_context_1.OpenApiContext; } });
exports.Ajv = {
    createRequestAjv: ajv_1.createRequestAjv,
    createResponseAjv: ajv_1.createResponseAjv,
};
class HttpError extends Error {
    constructor(err) {
        super(err.name);
        this.name = err.name;
        this.status = err.status;
        this.path = err.path;
        this.message = err.message;
        this.errors =
            err.errors == undefined
                ? [
                    {
                        path: err.path,
                        message: err.message,
                    },
                ]
                : err.errors;
    }
    static create(err) {
        switch (err.status) {
            case 400:
                return new BadRequest(err);
            case 401:
                return new Unauthorized(err);
            case 403:
                return new Forbidden(err);
            case 404:
                return new NotFound(err);
            case 405:
                return new MethodNotAllowed(err);
            case 406:
                return new NotAcceptable(err);
            case 413:
                return new RequestEntityTooLarge(err);
            case 415:
                return new UnsupportedMediaType(err);
            default:
                return new InternalServerError(err);
        }
    }
}
exports.HttpError = HttpError;
class NotFound extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 404,
            path: err.path,
            message: err.message,
            name: 'Not Found',
        });
    }
}
exports.NotFound = NotFound;
class NotAcceptable extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 406,
            path: err.path,
            name: 'Not Acceptable',
            message: err.message,
        });
    }
}
exports.NotAcceptable = NotAcceptable;
class MethodNotAllowed extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 405,
            path: err.path,
            name: 'Method Not Allowed',
            message: err.message,
        });
    }
}
exports.MethodNotAllowed = MethodNotAllowed;
class BadRequest extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 400,
            path: err.path,
            name: 'Bad Request',
            message: err.message,
            errors: err.errors,
        });
    }
}
exports.BadRequest = BadRequest;
class RequestEntityTooLarge extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 413,
            path: err.path,
            name: 'Request Entity Too Large',
            message: err.message,
        });
    }
}
exports.RequestEntityTooLarge = RequestEntityTooLarge;
class InternalServerError extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 500,
            path: err.path,
            name: 'Internal Server Error',
            message: err.message,
            errors: err.errors,
        });
    }
}
exports.InternalServerError = InternalServerError;
class UnsupportedMediaType extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 415,
            path: err.path,
            name: 'Unsupported Media Type',
            message: err.message,
        });
    }
}
exports.UnsupportedMediaType = UnsupportedMediaType;
class Unauthorized extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 401,
            path: err.path,
            name: 'Unauthorized',
            message: err.message,
        });
    }
}
exports.Unauthorized = Unauthorized;
class Forbidden extends HttpError {
    constructor(err) {
        super({
            status: err.overrideStatus || 403,
            path: err.path,
            name: 'Forbidden',
            message: err.message,
        });
    }
}
exports.Forbidden = Forbidden;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedErrorModel = exports.ValidationErrorModel = exports.ResourceNotFoundErrorModel = exports.RouteNotFoundErrorModel = exports.ErrorModel = void 0;
class ErrorModel {
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
}
exports.ErrorModel = ErrorModel;
class RouteNotFoundErrorModel extends ErrorModel {
    constructor(route) {
        super(`Route ${route} not exist`, 404);
    }
}
exports.RouteNotFoundErrorModel = RouteNotFoundErrorModel;
class ResourceNotFoundErrorModel extends ErrorModel {
    constructor(id) {
        super(`id ${id} not exist`, 404);
    }
}
exports.ResourceNotFoundErrorModel = ResourceNotFoundErrorModel;
class ValidationErrorModel extends ErrorModel {
    constructor(message) {
        super(message, 400);
    }
}
exports.ValidationErrorModel = ValidationErrorModel;
class UnauthorizedErrorModel extends ErrorModel {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedErrorModel = UnauthorizedErrorModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
const vacations_controller_1 = __importDefault(require("./6-controllers/vacations-controller"));
const auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const sanitize_1 = __importDefault(require("./2-utils/sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use("/api/", (0, express_rate_limit_1.default)({
    max: 50,
    windowMs: 1000,
    message: "Are you a hacker?"
}));
server.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
// server.use(cors({ origin: appConfig.frontendUrl }));
server.use(express_1.default.static(path_1.default.join(__dirname, "./_front-end")));
server.use((0, express_fileupload_1.default)());
server.use("/api", vacations_controller_1.default);
server.use("/api", auth_controller_1.default);
server.use("*", (request, response) => {
    response.sendFile(path_1.default.join(__dirname, "./_front-end/index.html"));
});
// server.use("*", routeNotFound);
server.use(sanitize_1.default);
server.use(catch_all_1.default);
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

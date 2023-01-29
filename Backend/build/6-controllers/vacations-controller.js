"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vacation_model_1 = __importDefault(require("../4-models/vacation-model"));
const vacations_logic_1 = __importDefault(require("../5-logic/vacations-logic"));
const vacations_logic_2 = __importDefault(require("../5-logic/vacations-logic"));
const path_1 = __importDefault(require("path"));
const block_non_logged_in_1 = __importDefault(require("../3-middleware/block-non-logged-in"));
const router = express_1.default.Router();
// GET http://localhost:3001/api/vacations
router.get("/vacations", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = +request.params.userId;
        if (!userId)
            userId = 0;
        const vacations = yield vacations_logic_2.default.getAllVacations();
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }
}));
// GET http://localhost:3001/api/liked-vacations/:userId
router.get("/liked-vacations/:userId([0-9]+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.params.userId;
        const likedVacations = yield vacations_logic_2.default.getLikedVacationsByUser(userId);
        response.json(likedVacations);
    }
    catch (err) {
        next(err);
    }
}));
// GET http://localhost:3001/api/vacations/:vacationId
router.get("/vacations/:vacationId([0-9]+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = yield vacations_logic_2.default.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err) {
        next(err);
    }
}));
// POST http://localhost:3001/api/vacations
router.post("/vacations", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image; //body
        const vacation = new vacation_model_1.default(request.body);
        const addedVacation = yield vacations_logic_2.default.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err) {
        next(err);
    }
}));
// PUT http://localhost:3001/api/vacations/:vacationId
router.put("/vacations/:vacationId([0-9]+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;
        request.body.image = (_b = request.files) === null || _b === void 0 ? void 0 : _b.image;
        const vacation = new vacation_model_1.default(request.body);
        const updatedVacation = yield vacations_logic_1.default.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err) {
        next(err);
    }
}));
// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/vacations/:vacationId([0-9]+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        yield vacations_logic_1.default.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}));
//GET all images:
router.get("/vacations/images/:imageName", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path_1.default.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err) {
        next(err);
    }
}));
// GET http://localhost:3001/api/liked-vacations
router.get("/liked-vacations", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followers = yield vacations_logic_2.default.getAllFollowers();
        response.json(followers);
    }
    catch (err) {
        next(err);
    }
}));
// POST http://localhost:3001/api/liked-vacations
router.post("/liked-vacations", [block_non_logged_in_1.default], (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.body.userId;
        const vacationId = +request.body.vacationId;
        const likedVacation = yield vacations_logic_2.default.addFollower(userId, vacationId);
        response.status(201).json(likedVacation);
    }
    catch (err) {
        next(err);
    }
}));
// DELETE http://localhost:3001/api/liked-vacations
router.delete("/liked-vacations/:vacationId/:userId", [block_non_logged_in_1.default], (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        yield vacations_logic_1.default.deleteFollower(vacationId, userId);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;

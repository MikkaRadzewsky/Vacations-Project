"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class VacationModel {
    constructor(vacation) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
    }
    validate() {
        var _a;
        const result = VacationModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
VacationModel.validationSchema = joi_1.default.object({
    vacationId: joi_1.default.number().optional().positive().integer(),
    destination: joi_1.default.string().required().min(2).max(50),
    description: joi_1.default.string().required().min(10).max(1000),
    startDate: joi_1.default.string().required(),
    endDate: joi_1.default.string().required(),
    price: joi_1.default.number().required().min(0).max(100000),
    image: joi_1.default.object().optional(),
    imageName: joi_1.default.optional()
});
exports.default = VacationModel;

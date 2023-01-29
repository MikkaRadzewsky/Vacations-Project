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
const dal_1 = __importDefault(require("../2-utils/dal"));
const error_models_1 = require("../4-models/error-models");
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// Get all vacation:
function getAllVacations() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = ` SELECT *
                  FROM vacations`;
        const vacations = yield dal_1.default.execute(sql, {});
        return vacations;
    });
}
// Get all vacations by current user:
function getLikedVacationsByUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `
          SELECT DISTINCT
          V.vacationId, destination, description, DATE_FORMAT(startDate,'%Y-%m-%D') AS startDate, DATE_FORMAT(endDate,'%Y-%m-%d') AS endDate, price, imageName, 
              EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
              COUNT(F.userId) AS followersCount
          FROM vacations AS V LEFT JOIN followers AS F
          ON V.vacationId = F.vacationId
          GROUP BY vacationId
          ORDER BY startDate DESC
      `;
        const vacations = yield dal_1.default.execute(sql, [userId]);
        return vacations;
        //   }
    });
}
//Get one vacation:
function getOneVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `
            SELECT vacationId, destination, description, DATE_FORMAT(startDate,'%Y-%m-%d') AS startDate, DATE_FORMAT(endDate,'%Y-%m-%d') AS endDate, price, imageName FROM vacations WHERE vacationId = ?
        `;
        const vacations = yield dal_1.default.execute(sql, [vacationId]);
        const vacation = vacations[0];
        if (!vacation)
            throw new error_models_1.ResourceNotFoundErrorModel(vacationId);
        return vacation;
    });
}
//Add vacation:
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = vacation.validate();
        if (errors)
            throw new error_models_1.ValidationErrorModel(errors);
        if (vacation.image) {
            const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
            vacation.imageName = (0, uuid_1.v4)() + extension;
            yield vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
            delete vacation.image;
        }
        const sql = `
    INSERT INTO vacations(
        vacationId,
        destination,
        description,
        startDate,
        endDate,
        price,
        imageName
    )
    VALUES(
        Default,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
        )
`;
        const info = yield dal_1.default.execute(sql, [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            vacation.imageName
        ]);
        vacation.vacationId = info.insertId;
        return vacation;
    });
}
// Update existing vacation: 
function updateVacation(vacation) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = vacation.validate();
        if (error)
            throw new error_models_1.ValidationErrorModel(error);
        if (vacation.image) {
            if (fs_1.default.existsSync("./src/1-assets/images/" + vacation.imageName)) {
                fs_1.default.unlinkSync("./src/1-assets/images/" + vacation.imageName);
            }
            const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
            vacation.imageName = (0, uuid_1.v4)() + extension;
            yield vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
            delete vacation.image;
        }
        const sql = `
        UPDATE vacations SET
          destination = ? ,
          description = ? ,
          startDate = ? ,
          endDate = ? ,
          price = ? ,
          imageName = ?
        WHERE vacationId = ?
    `;
        const info = yield dal_1.default.execute(sql, [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            vacation.imageName,
            vacation.vacationId
        ]);
        if (info.affectedRows === 0)
            throw new error_models_1.ResourceNotFoundErrorModel(vacation.vacationId);
        return vacation;
    });
}
// Delete vacation:
function deleteVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        let vacations = getAllVacations();
        let vacation = (yield vacations).find(v => v.vacationId === vacationId);
        if (fs_1.default.existsSync("./src/1-assets/images/" + vacation.imageName)) {
            fs_1.default.unlinkSync("./src/1-assets/images/" + vacation.imageName);
        }
        const sql = `DELETE FROM vacations WHERE vacationId = ?`;
        const info = yield dal_1.default.execute(sql, [vacationId]);
        if (info.affectedRows === 0)
            throw new error_models_1.ResourceNotFoundErrorModel(vacationId);
    });
}
//Get All Followers:
function getAllFollowers() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = ` SELECT *
                    FROM followers`;
        const followers = yield dal_1.default.execute(sql, {});
        return followers;
    });
}
//Add follower:
function addFollower(userId, vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `
      INSERT INTO followers(
          vacationId,
          userId
      )
      VALUES(
          ?,
          ?
          )
  `;
        const info = yield dal_1.default.execute(sql, [
            vacationId,
            userId
        ]);
    });
}
// Delete follower:
function deleteFollower(vacationId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `DELETE FROM followers WHERE vacationId = ? AND userId = ?`;
        const info = yield dal_1.default.execute(sql, [vacationId, userId]);
        if (info.affectedRows === 0)
            throw new error_models_1.ResourceNotFoundErrorModel(vacationId || userId);
    });
}
exports.default = {
    getAllVacations,
    getLikedVacationsByUser,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getAllFollowers,
    addFollower,
    deleteFollower
};

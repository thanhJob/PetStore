"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentPassword = exports.resetPassword = exports.forgotPassword = exports.permissionsAccout = exports.security = exports.logIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importStar(require("crypto"));
// Import User Model
const userModel_1 = __importDefault(require("../../../models/user/userModel"));
const service_1 = require("../service/service");
// Config function create token
const privateKey = process.env.PRIVATE_KEY_TOKEN ?? "";
const signToken = (model) => {
    return jsonwebtoken_1.default.sign({ model }, privateKey, {
        expiresIn: process.env.EXPIRES_TOKEN,
    });
};
// conrrect password function
const comparePass = (passWord, userPass) => {
    return bcrypt_1.default.compare(passWord, userPass);
};
// config function resetToken
const resetToken = (model) => {
    const token = crypto_1.default.randomBytes(32).toString("hex");
    model.passwordResetToken = (0, crypto_1.createHash)("sha256").update(token).digest("hex");
    model.passwordResetExpires = new Date(Date.now() * 10 * 60 * 1000);
    return token;
};
async function signUp(req, res, next) {
    try {
        const newUser = await (0, service_1.createUser)(req.body);
        const token = signToken(newUser.id);
        res.status(201).json({
            status: "Successfully!",
            token,
            data: newUser,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.signUp = signUp;
async function logIn(req, res, next) {
    try {
        const user = await (0, service_1.logInUser)(req);
        const token = signToken(user.id);
        res.status(201).json({
            status: "Successfully",
            token,
            data: user,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.logIn = logIn;
async function security(req, res, next) {
    try {
        const currentUser = await (0, service_1.securityUser)(req);
        // grant permission
        req.user = currentUser;
        next();
    }
    catch (err) {
        console.log(err);
    }
}
exports.security = security;
function permissionsAccout(...roles) {
    return async (req, res, next) => {
        if (!roles.includes(Object.values(req.user)[5].role)) {
            throw new Error("You do not have permission to perform this action!");
        }
        next();
    };
}
exports.permissionsAccout = permissionsAccout;
async function forgotPassword(req, res, next) {
    try {
        await (0, service_1.forgotPassUser)(req, res);
        res.status(201).json({
            status: "Successfully!",
        });
    }
    catch (err) {
        const currentUser = await userModel_1.default.findOne({ email: req.body.email });
        currentUser.passwordResetToken = undefined;
        currentUser.passwordResetExpires = undefined;
        currentUser.save({ validateBeforeSave: false });
        console.log(err);
    }
}
exports.forgotPassword = forgotPassword;
async function resetPassword(req, res, next) {
    try {
        const currentUser = await (0, service_1.resetPassUser)(req, res);
        res.status(203).json({
            status: "Successfully!",
            data: currentUser,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.resetPassword = resetPassword;
async function updateCurrentPassword(req, res, next) {
    try {
        const currentUser = await (0, service_1.updatePassCurrentUser)(req);
        res.status(203).json({
            status: "Successfully!",
            data: currentUser,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateCurrentPassword = updateCurrentPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9jb250cm9sbGVycy9zZWN1cml0eS9jb250cm9sbGVyL2F1dGguQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdFQUErQjtBQUMvQixvREFBNEI7QUFDNUIsaURBQTRDO0FBRTVDLG9CQUFvQjtBQUNwQiwrRUFBa0Q7QUFHbEQsZ0RBTzRCO0FBRTVCLCtCQUErQjtBQUMvQixNQUFNLFVBQVUsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztBQUUvRCxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sc0JBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUU7UUFDckMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYTtLQUNyQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRiw2QkFBNkI7QUFDN0IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFhLEVBQUUsUUFBYSxFQUFFLEVBQUU7SUFDbkQsT0FBTyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDO0FBRUYsNkJBQTZCO0FBQzdCLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7SUFDaEMsTUFBTSxLQUFLLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFBLG1CQUFVLEVBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENB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
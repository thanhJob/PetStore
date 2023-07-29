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
exports.updatePassCurrentUser = exports.resetPassUser = exports.forgotPassUser = exports.securityUser = exports.logInUser = exports.deleteId = exports.updateId = exports.createUser = exports.getId = exports.getAll = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importStar(require("crypto"));
// Import User Model
const userModel_1 = __importDefault(require("../../../models/user/userModel"));
const configEmail_1 = require("../../../../ultis/configEmail");
// Config function create token
const privateKey = process.env.PRIVATE_KEY_TOKEN ?? "";
// Hash password user
const hashPassword = async (password) => {
    return await bcrypt_1.default.hash(password, 12);
};
// conrrect password function
const comparePass = (passWord, userPass) => {
    return bcrypt_1.default.compare(passWord, userPass);
};
async function getAll() {
    const users = await userModel_1.default.find();
    if (!users)
        throw new Error("Can't get data user. Try again later!");
    return users;
}
exports.getAll = getAll;
async function getId(id) {
    const user = await userModel_1.default.findById(id).populate("cart");
    if (!user)
        throw new Error("Can't get data user. Try again later!");
    return user;
}
exports.getId = getId;
async function createUser(body) {
    const user = await userModel_1.default.create(body);
    user.password = await hashPassword(user.password);
    user.save();
    if (!user)
        throw new Error("Can't create data user. Try again later!");
    return user;
}
exports.createUser = createUser;
async function updateId(id, body) {
    const user = await userModel_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    if (!user)
        throw new Error("Can't update user. Try again later!");
    return user;
}
exports.updateId = updateId;
async function deleteId(id) {
    const user = await userModel_1.default.findByIdAndDelete(id);
    if (!user)
        throw new Error("Can't delete user. Try again later!");
    return user;
}
exports.deleteId = deleteId;
async function logInUser(req) {
    const user = await userModel_1.default.findOne({ email: req.body.email });
    if (!user)
        throw new Error("User does not exits! Try again later.");
    // // check pass
    const conrrectPass = await comparePass(req.body.password, user.password);
    if (!conrrectPass)
        throw new Error("Conrrect password to false! Try again.");
    return user;
}
exports.logInUser = logInUser;
async function securityUser(req) {
    // get token
    let token;
    if (req.headers.authorization ||
        req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization?.split(" ")[1];
    }
    // check token
    if (!token)
        throw new Error("You does not login. Try again!");
    // check expired token
    const expiresToken = jsonwebtoken_1.default.verify(token, privateKey);
    if (!expiresToken)
        throw new Error("Verify expired token");
    // console.log(Object.values(expiresToken)[0]);
    // check user
    const currentUser = await userModel_1.default.findOne({
        _id: Object.values(expiresToken)[0],
    });
    if (!currentUser)
        throw new Error("User does not exits. Try again!");
    return currentUser;
}
exports.securityUser = securityUser;
async function forgotPassUser(req, res) {
    // config function resetToken
    const resetToken = (model) => {
        const token = crypto_1.default.randomBytes(32).toString("hex");
        model.passwordResetToken = (0, crypto_1.createHash)("sha256").update(token).digest("hex");
        model.passwordResetExpires = new Date(Date.now() * 10 * 60 * 1000);
        return token;
    };
    // check user exits
    const currentUser = await userModel_1.default.findOne({ email: req.body.email });
    // console.log(currentUser);
    if (!currentUser)
        throw new Error("User does not exits with email. Try again!");
    // create token reset password
    const tokenValue = resetToken(currentUser);
    // save value user
    currentUser.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${tokenValue}`;
    const message = `Forgot your password! Submit a patch request with your new password in here: \n
      ${resetURL}`;
    return await (0, configEmail_1.sendEmail)({
        email: currentUser.email,
        subject: "Send to mail reset token password! (Invalid for 10 minute)",
        message: message,
    });
}
exports.forgotPassUser = forgotPassUser;
async function resetPassUser(req, res) {
    // create token with token in params
    const hashedToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    // console.log(hashedToken);
    // check user
    const currentUser = await userModel_1.default.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $ne: Date.now() },
    });
    if (!currentUser)
        throw new Error("User does not exits with token. Pls try again later!");
    currentUser.password = req.body.newPassword;
    currentUser.passwordResetToken = undefined;
    currentUser.passwordResetExpires = undefined;
    currentUser.save();
    return currentUser;
}
exports.resetPassUser = resetPassUser;
async function updatePassCurrentUser(req) {
    const currentUser = await userModel_1.default.findById(Object.values(req.user)[5]._id);
    // console.log(currentUser);
    if (!currentUser)
        throw new Error("User does not exits. Try again!");
    // check compare pass
    const conrrectPass = await comparePass(req.body.currentPass, Object.values(req.user)[5].password);
    if (!conrrectPass)
        throw new Error("Compare password it false. Try again!");
    currentUser.password = req.body.newPass;
    currentUser.password = await hashPassword(currentUser.password);
    currentUser.save();
    return currentUser;
}
exports.updatePassCurrentUser = updatePassCurrentUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvY29udHJvbGxlcnMvc2VjdXJpdHkvc2VydmljZS9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0VBQStCO0FBQy9CLG9EQUE0QjtBQUM1QixpREFBNEM7QUFFNUMsb0JBQW9CO0FBQ3BCLCtFQUFrRDtBQUNsRCwrREFBMEQ7QUFHMUQsK0JBQStCO0FBQy9CLE1BQU0sVUFBVSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO0FBRS9ELHFCQUFxQjtBQUNyQixNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQzlDLE9BQU8sTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUYsNkJBQTZCO0FBQzdCLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBYSxFQUFFLFFBQWEsRUFBRSxFQUFFO0lBQ25ELE9BQU8sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUVLLEtBQUssVUFBVSxNQUFNO0lBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sbUJBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUMsS0FBSztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUNyRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFKRCx3QkFJQztBQUVNLEtBQUssVUFBVSxLQUFLLENBQUMsRUFBVTtJQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUNwRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFKRCxzQkFJQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQUMsSUFBUztJQUN4QyxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNaLElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQU5ELGdDQU1DO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FBQyxFQUFVLEVBQUUsSUFBUztJQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtRQUNsRCxHQUFHLEVBQUUsSUFBSTtRQUNULGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVBELDRCQU9DO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FBQyxFQUFVO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNsRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFKRCw0QkFJQztBQUVNLEtBQUssVUFBVSxTQUFTLENBQUMsR0FBWTtJQUMxQyxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUNwRSxnQkFBZ0I7SUFDaEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pFLElBQUksQ0FBQyxZQUFZO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBRTdFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVJELDhCQVFDO0FBRU0sS0FBSyxVQUFVLFlBQVksQ0FBQyxHQUFZO0lBQzdDLFlBQVk7SUFDWixJQUFJLEtBQUssQ0FBQztJQUNWLElBQ0UsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhO1FBQ3pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDL0M7UUFDQSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsY0FBYztJQUNkLElBQUksQ0FBQyxLQUFLO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBRTlELHNCQUFzQjtJQUN0QixNQUFNLFlBQVksR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDLFlBQVk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDM0QsK0NBQStDO0lBQy9DLGFBQWE7SUFDYixNQUFNLFdBQVcsR0FBRyxNQUFNLG1CQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsV0FBVztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUVyRSxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBeEJELG9DQXdCQztBQUVNLEtBQUssVUFBVSxjQUFjLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDOUQsNkJBQTZCO0lBQzdCLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDaEMsTUFBTSxLQUFLLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFBLG1CQUFVLEVBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxLQUFLLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFbkUsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUM7SUFDRixtQkFBbUI7SUFDbkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxtQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbEUsNEJBQTRCO0lBQzVCLElBQUksQ0FBQyxXQUFXO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0lBRWhFLDhCQUE4QjtJQUM5QixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0Msa0JBQWtCO0lBQ2xCLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRWhELE1BQU0sUUFBUSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUMzQyxNQUFNLENBQ1AsK0JBQStCLFVBQVUsRUFBRSxDQUFDO0lBQzdDLE1BQU0sT0FBTyxHQUFHO1FBQ1YsUUFBUSxFQUFFLENBQUM7SUFFakIsT0FBTyxNQUFNLElBQUEsdUJBQVMsRUFBQztRQUNyQixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7UUFDeEIsT0FBTyxFQUFFLDREQUE0RDtRQUNyRSxPQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBL0JELHdDQStCQztBQUVNLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDN0Qsb0NBQW9DO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLGdCQUFNO1NBQ3ZCLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQiw0QkFBNEI7SUFDNUIsYUFBYTtJQUNiLE1BQU0sV0FBVyxHQUFHLE1BQU0sbUJBQUksQ0FBQyxPQUFPLENBQUM7UUFDckMsa0JBQWtCLEVBQUUsV0FBVztRQUMvQixvQkFBb0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7S0FDMUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLFdBQVc7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7SUFFMUUsV0FBVyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0lBQzNDLFdBQVcsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLENBQUM7SUFDN0MsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRW5CLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFyQkQsc0NBcUJDO0FBRU0sS0FBSyxVQUFVLHFCQUFxQixDQUFDLEdBQVk7SUFDdEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6RSw0QkFBNEI7SUFDNUIsSUFBSSxDQUFDLFdBQVc7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFFckUscUJBQXFCO0lBQ3JCLE1BQU0sWUFBWSxHQUFHLE1BQU0sV0FBVyxDQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUNyQyxDQUFDO0lBQ0YsSUFBSSxDQUFDLFlBQVk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFFNUUsV0FBVyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QyxXQUFXLENBQUMsUUFBUSxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFbkIsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQWpCRCxzREFpQkMifQ==
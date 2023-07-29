"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_Controller_1 = require("../controllers/security/controller/auth.Controller");
const user_Controller_1 = require("../controllers/user/controller/user.Controller");
const cartRouter_1 = __importDefault(require("./cartRouter"));
const router = express_1.default.Router();
// use router cart
router.use("/:idPet/createCart", cartRouter_1.default);
// AUTHENTIC
router.route("/SignUp").post(auth_Controller_1.signUp);
router.route("/logIn").post(auth_Controller_1.logIn);
router
    .route("/forgotPassword")
    .post(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), auth_Controller_1.forgotPassword);
router
    .route("/resetPassword/:token")
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), auth_Controller_1.resetPassword);
router
    .route("/updateCurrentPassword")
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), auth_Controller_1.updateCurrentPassword);
router
    .route("/removeActive")
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), user_Controller_1.removeActive);
router
    .route("/updateProfileMe")
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), user_Controller_1.updateProfileMe);
// USER
router.route("/").get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), user_Controller_1.getUsers);
// PARAMS ID
router
    .route("/:id")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), user_Controller_1.getUser)
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), user_Controller_1.updateUser)
    .delete(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), user_Controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVycy91c2VyUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHdGQVM0RDtBQUM1RCxvRkFPd0Q7QUFDeEQsOERBQXNDO0FBRXRDLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsa0JBQWtCO0FBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQVUsQ0FBQyxDQUFDO0FBRTdDLFlBQVk7QUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBTSxDQUFDLENBQUM7QUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQUssQ0FBQyxDQUFDO0FBQ25DLE1BQU07S0FDSCxLQUFLLENBQUMsaUJBQWlCLENBQUM7S0FDeEIsSUFBSSxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsZ0NBQWMsQ0FBQyxDQUFDO0FBQ3RFLE1BQU07S0FDSCxLQUFLLENBQUMsdUJBQXVCLENBQUM7S0FDOUIsS0FBSyxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsK0JBQWEsQ0FBQyxDQUFDO0FBQ3RFLE1BQU07S0FDSCxLQUFLLENBQUMsd0JBQXdCLENBQUM7S0FDL0IsS0FBSyxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsdUNBQXFCLENBQUMsQ0FBQztBQUU5RSxNQUFNO0tBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQztLQUN0QixLQUFLLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSw4QkFBWSxDQUFDLENBQUM7QUFFckUsTUFBTTtLQUNILEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztLQUN6QixLQUFLLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxpQ0FBZSxDQUFDLENBQUM7QUFFeEUsT0FBTztBQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsMEJBQVEsQ0FBQyxDQUFDO0FBRTlFLFlBQVk7QUFDWixNQUFNO0tBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQztLQUNiLEdBQUcsQ0FBQywwQkFBUSxFQUFFLElBQUEsbUNBQWlCLEVBQUMsT0FBTyxDQUFDLEVBQUUseUJBQU8sQ0FBQztLQUNsRCxLQUFLLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFFLDRCQUFVLENBQUM7S0FDdkQsTUFBTSxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLENBQUMsRUFBRSw0QkFBVSxDQUFDLENBQUM7QUFFNUQsa0JBQWUsTUFBTSxDQUFDIn0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postNew/controller/postController");
const auth_Controller_1 = require("../controllers/security/controller/auth.Controller");
const commentRouter_1 = __importDefault(require("./commentRouter"));
const router = express_1.default.Router();
// Middleware
router.use("/:idPost/createCmt", commentRouter_1.default);
router
    .route("/")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), postController_1.getPosts)
    .post(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), postController_1.createPost);
router
    .route("/:id")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), postController_1.getPost)
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), postController_1.updatePost)
    .delete(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), postController_1.deletePost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVycy9wb3N0Um91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHFGQU0wRDtBQUMxRCx3RkFHNEQ7QUFDNUQsb0VBQXdDO0FBRXhDLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsYUFBYTtBQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsdUJBQVMsQ0FBQyxDQUFDO0FBRTVDLE1BQU07S0FDSCxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsR0FBRyxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUseUJBQVEsQ0FBQztLQUMzRCxJQUFJLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSwyQkFBVSxDQUFDLENBQUM7QUFFbEUsTUFBTTtLQUNILEtBQUssQ0FBQyxNQUFNLENBQUM7S0FDYixHQUFHLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFFLHdCQUFPLENBQUM7S0FDbEQsS0FBSyxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsMkJBQVUsQ0FBQztLQUMvRCxNQUFNLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFFLDJCQUFVLENBQUMsQ0FBQztBQUU1RCxrQkFBZSxNQUFNLENBQUMifQ==
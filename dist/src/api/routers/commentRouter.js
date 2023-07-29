"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/comment/controller/commentController");
const auth_Controller_1 = require("../controllers/security/controller/auth.Controller");
const router = express_1.default.Router({ mergeParams: true });
router.route("/:id").get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), commentController_1.getComment);
router
    .route("/")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), commentController_1.getComments)
    .post(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin", "user"), commentController_1.createComment);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudFJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVycy9jb21tZW50Um91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDJGQUk2RDtBQUM3RCx3RkFHNEQ7QUFFNUQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVyRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQywwQkFBUSxFQUFFLElBQUEsbUNBQWlCLEVBQUMsT0FBTyxDQUFDLEVBQUUsOEJBQVUsQ0FBQyxDQUFDO0FBRTNFLE1BQU07S0FDSCxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsR0FBRyxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLENBQUMsRUFBRSwrQkFBVyxDQUFDO0tBQ3RELElBQUksQ0FBQywwQkFBUSxFQUFFLElBQUEsbUNBQWlCLEVBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLGlDQUFhLENBQUMsQ0FBQztBQUVyRSxrQkFBZSxNQUFNLENBQUMifQ==
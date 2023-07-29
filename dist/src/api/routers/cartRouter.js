"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_Controller_1 = require("../controllers/cart/controller/cart.Controller");
const auth_Controller_1 = require("../controllers/security/controller/auth.Controller");
const router = express_1.default.Router({ mergeParams: true });
router
    .route("/:id")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), cart_Controller_1.getCart)
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), cart_Controller_1.updateCart);
router
    .route("/")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), cart_Controller_1.getCarts)
    .post(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), cart_Controller_1.createCart);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydFJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVycy9jYXJ0Um91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLG9GQU13RDtBQUN4RCx3RkFHNEQ7QUFDNUQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVyRCxNQUFNO0tBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQztLQUNiLEdBQUcsQ0FBQywwQkFBUSxFQUFFLElBQUEsbUNBQWlCLEVBQUMsT0FBTyxDQUFDLEVBQUUseUJBQU8sQ0FBQztLQUNsRCxLQUFLLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFFLDRCQUFVLENBQUMsQ0FBQztBQUUzRCxNQUFNO0tBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLEdBQUcsQ0FBQywwQkFBUSxFQUFFLElBQUEsbUNBQWlCLEVBQUMsT0FBTyxDQUFDLEVBQUUsMEJBQVEsQ0FBQztLQUNuRCxJQUFJLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFFLDRCQUFVLENBQUMsQ0FBQztBQUUxRCxrQkFBZSxNQUFNLENBQUMifQ==
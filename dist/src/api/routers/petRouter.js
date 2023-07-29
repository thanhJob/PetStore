"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_Controller_1 = require("../controllers/security/controller/auth.Controller");
const pet_Controller_1 = require("../controllers/pets/controller/pet.Controller");
// Import Controller
const router = express_1.default.Router();
router
    .route("/sortPrice")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), pet_Controller_1.sortProduct, pet_Controller_1.getPets);
router
    .route("/")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), pet_Controller_1.getPets)
    .post(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), pet_Controller_1.createPet);
router
    .route("/:id")
    .get(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), pet_Controller_1.getPet)
    .patch(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), pet_Controller_1.updatePet)
    .delete(auth_Controller_1.security, (0, auth_Controller_1.permissionsAccout)("admin"), pet_Controller_1.deletePet);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGV0Um91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yb3V0ZXJzL3BldFJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qix3RkFHNEQ7QUFDNUQsa0ZBT3VEO0FBQ3ZELG9CQUFvQjtBQUVwQixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU07S0FDSCxLQUFLLENBQUMsWUFBWSxDQUFDO0tBQ25CLEdBQUcsQ0FBQywwQkFBUSxFQUFFLElBQUEsbUNBQWlCLEVBQUMsT0FBTyxDQUFDLEVBQUUsNEJBQVcsRUFBRSx3QkFBTyxDQUFDLENBQUM7QUFFbkUsTUFBTTtLQUNILEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVixHQUFHLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFFLHdCQUFPLENBQUM7S0FDbEQsSUFBSSxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLENBQUMsRUFBRSwwQkFBUyxDQUFDLENBQUM7QUFFekQsTUFBTTtLQUNILEtBQUssQ0FBQyxNQUFNLENBQUM7S0FDYixHQUFHLENBQUMsMEJBQVEsRUFBRSxJQUFBLG1DQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFFLHVCQUFNLENBQUM7S0FDakQsS0FBSyxDQUFDLDBCQUFRLEVBQUUsSUFBQSxtQ0FBaUIsRUFBQyxPQUFPLENBQUMsRUFBRSwwQkFBUyxDQUFDO0tBQ3RELE1BQU0sQ0FBQywwQkFBUSxFQUFFLElBQUEsbUNBQWlCLEVBQUMsT0FBTyxDQUFDLEVBQUUsMEJBQVMsQ0FBQyxDQUFDO0FBRTNELGtCQUFlLE1BQU0sQ0FBQyJ9
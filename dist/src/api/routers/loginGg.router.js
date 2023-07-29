"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginGg_Controller_1 = __importDefault(require("../controllers/loginGG/loginGg.Controller"));
const router = express_1.default.Router();
router.get("/auth/google", loginGg_Controller_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/auth/google/callback", loginGg_Controller_1.default.authenticate("google"), (req, res) => {
    res.redirect("/home");
});
router.get("/home", (req, res) => {
    res.send("hello");
    // console.log(req.user);
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5HZy5yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3JvdXRlcnMvbG9naW5HZy5yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBbUU7QUFDbkUsbUdBQW1FO0FBQ25FLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FDUixjQUFjLEVBQ2QsNEJBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFO0lBQ2hDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7Q0FDNUIsQ0FBQyxDQUNILENBQUM7QUFFRixNQUFNLENBQUMsR0FBRyxDQUNSLHVCQUF1QixFQUN2Qiw0QkFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFDakMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDOUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ2xELEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEIseUJBQXlCO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.simple()),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
        new winston_1.default.transports.File({ filename: "combined.log" }),
        new winston_1.default.transports.Console(),
    ],
});
exports.default = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Vycm9ySGFuZGxlL2NvbmZpZ0xvZ2dlci9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFFOUIsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUM7SUFDbEMsS0FBSyxFQUFFLE1BQU07SUFDYixNQUFNLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM1QixpQkFBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFDdEMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQ3hCO0lBQ0QsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRTtJQUN4QyxVQUFVLEVBQUU7UUFDVixJQUFJLGlCQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3RFLElBQUksaUJBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFDO1FBQ3pELElBQUksaUJBQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO0tBQ2pDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=
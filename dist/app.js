"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: ".env" });
const middleware_1 = require("./src/errorHandle/middleware");
const cookie_session_1 = __importDefault(require("cookie-session"));
const keys_1 = __importDefault(require("./src/ultis/keys"));
const http_1 = require("http");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
// Import Router
const petRouter_1 = __importDefault(require("./src/api/routers/petRouter"));
const userRouter_1 = __importDefault(require("./src/api/routers/userRouter"));
const postRouter_1 = __importDefault(require("./src/api/routers/postRouter"));
const loginGg_router_1 = __importDefault(require("./src/api/routers/loginGg.router"));
const commentRouter_1 = __importDefault(require("./src/api/routers/commentRouter"));
const cartRouter_1 = __importDefault(require("./src/api/routers/cartRouter"));
const paymentRouter_1 = __importDefault(require("./src/api/routers/paymentRouter"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.static(path_1.default.join(__dirname)));
app.use((0, morgan_1.default)("dev"));
app.use(middleware_1.errorMiddleware);
app.use((0, helmet_1.default)());
app.use((0, cookie_session_1.default)({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys_1.default.coockieKeys],
}));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api", apiLimiter);
// Config socket.io
const server = (0, http_1.createServer)(app);
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
socketIo.on("connection", (socket) => {
    ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);
    socket.on("sendDataClient", function (data) {
        // Handle khi có sự kiện tên là sendDataClient từ phía client
        socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
});
app.all("*", (req, res, next) => {
    // logger.info(`Can't find ${req.originalUrl} on this sever!`);
    next();
});
app.use("/", loginGg_router_1.default);
app.use("/", paymentRouter_1.default);
app.use("/api/v1/pets", petRouter_1.default);
app.use("/api/v1/users", userRouter_1.default);
app.use("/api/v1/posts", postRouter_1.default);
app.use("/api/v1/comments", commentRouter_1.default);
app.use("/api/v1/carts", cartRouter_1.default);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQW1FO0FBQ25FLG9EQUE0QjtBQUM1QixvREFBNEI7QUFDNUIsZ0RBQXdCO0FBQ3hCLGdCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDaEMsNkRBQStEO0FBRS9ELG9FQUEyQztBQUMzQyw0REFBb0M7QUFDcEMsK0JBQW9DO0FBRXBDLDRFQUEyQztBQUMzQyxvREFBNEI7QUFFNUIsZ0JBQWdCO0FBQ2hCLDRFQUFvRDtBQUNwRCw4RUFBc0Q7QUFDdEQsOEVBQXNEO0FBQ3RELHNGQUF1RDtBQUN2RCxvRkFBd0Q7QUFDeEQsOEVBQXNEO0FBQ3RELG9GQUE0RDtBQUU1RCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QixhQUFhO0FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsZ0JBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsNEJBQWUsQ0FBQyxDQUFDO0FBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxnQkFBTSxHQUFFLENBQUMsQ0FBQztBQUNsQixHQUFHLENBQUMsR0FBRyxDQUNMLElBQUEsd0JBQWEsRUFBQztJQUNaLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSTtJQUNoQyxJQUFJLEVBQUUsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFRO0NBQ2hDLENBQUMsQ0FDSCxDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBQSw0QkFBUyxFQUFDO0lBQzNCLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsR0FBRyxFQUFFLEdBQUc7SUFDUixlQUFlLEVBQUUsSUFBSTtJQUNyQixhQUFhLEVBQUUsS0FBSyxFQUFFLHNDQUFzQztDQUM3RCxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUU1QixtQkFBbUI7QUFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFDNUMsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLEdBQUc7S0FDWjtDQUNGLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7SUFDeEMsc0NBQXNDO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWhELE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxJQUFTO1FBQzdDLDZEQUE2RDtRQUM3RCxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLCtFQUErRTtJQUM1SCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyw2Q0FBNkM7SUFDbkYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDL0QsK0RBQStEO0lBQy9ELElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx3QkFBTyxDQUFDLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsdUJBQWEsQ0FBQyxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLG1CQUFTLENBQUMsQ0FBQztBQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxvQkFBVSxDQUFDLENBQUM7QUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsb0JBQVUsQ0FBQyxDQUFDO0FBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsdUJBQVMsQ0FBQyxDQUFDO0FBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLG9CQUFVLENBQUMsQ0FBQztBQUVyQyxrQkFBZSxHQUFHLENBQUMifQ==
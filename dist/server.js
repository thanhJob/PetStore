"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const app_1 = __importDefault(require("./app"));
// Connect Data
const URLData = process.env.DATA;
// console.log(URLData);
if (!URLData) {
    console.log("Url Data does not exits!");
}
else {
    mongoose_1.default
        .connect(URLData, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
        .then((doc) => {
        //   console.log(doc);
        console.log("Connect data mongoDB successful!");
    })
        .catch((err) => {
        console.log(err);
    });
}
const port = 5000 || process.env.PORT;
app_1.default.listen(port, () => {
    console.log(`App listen running at port: ${port}`);
    console.log(process.env.DEV);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esd0RBQWdDO0FBQ2hDLG9EQUE0QjtBQUU1QixnQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBRWhDLGdEQUF3QjtBQUV4QixlQUFlO0FBQ2YsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDakMsd0JBQXdCO0FBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUU7SUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Q0FDekM7S0FBTTtJQUNMLGtCQUFRO1NBQ0wsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNoQixlQUFlLEVBQUUsSUFBSTtRQUNyQixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLGdCQUFnQixFQUFFLEtBQUs7S0FDeEIsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1osc0JBQXNCO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQUVELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUN0QyxhQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMifQ==
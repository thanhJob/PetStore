"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail(options) {
    let transporter = nodemailer_1.default.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    await transporter.sendMail({
        from: "ThanhJob 👻 <thanhjobb@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnRW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdWx0aXMvY29uZmlnRW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNERBQW9DO0FBRTdCLEtBQUssVUFBVSxTQUFTLENBQUMsT0FBWTtJQUMxQyxJQUFJLFdBQVcsR0FBRyxvQkFBVSxDQUFDLGVBQWUsQ0FBQztRQUMzQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO1FBQ2pDLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZTtZQUNqQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO1NBQ2xDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3pCLElBQUksRUFBRSxtQ0FBbUM7UUFDekMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU87S0FDdEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhCRCw4QkFnQkMifQ==
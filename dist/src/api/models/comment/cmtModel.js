"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const commentSchemal = new mongoose_2.Schema({
    description: {
        type: String,
        required: [true, "A comment must have a description!"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 4.5,
    },
    createAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    post: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post",
            // reuired: [true, "Comment must be long a post"],
        },
    ],
    author: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            // reuired: [true, "Comment must be long a user"],
        },
    ],
}, {
    collection: "Comment",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// Middleware
// commentSchemal.pre<CommentInterface>(/^find/, function (next) {
//   this.populate({
//     path: "author",
//     select: "name email",
//   }).populate({
//     path: "post",
//     select: "title",
//   });
//   next();
// });
const Comment = mongoose_1.default.model("Comment", commentSchemal);
exports.default = Comment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY210TW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL21vZGVscy9jb21tZW50L2NtdE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLHVDQUFrQztBQUtsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFNLENBQy9CO0lBQ0UsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsb0NBQW9DLENBQUM7S0FDdkQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixPQUFPLEVBQUUsR0FBRztLQUNiO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQzlCO0lBQ0QsSUFBSSxFQUFFO1FBQ0o7WUFDRSxJQUFJLEVBQUUsa0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDcEMsR0FBRyxFQUFFLE1BQU07WUFDWCxrREFBa0Q7U0FDbkQ7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOO1lBQ0UsSUFBSSxFQUFFLGtCQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQ3BDLEdBQUcsRUFBRSxNQUFNO1lBQ1gsa0RBQWtEO1NBQ25EO0tBQ0Y7Q0FDRixFQUNEO0lBQ0UsVUFBVSxFQUFFLFNBQVM7SUFDckIsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUMxQixRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0NBQzdCLENBQ0YsQ0FBQztBQUVGLGFBQWE7QUFDYixrRUFBa0U7QUFDbEUsb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0Qiw0QkFBNEI7QUFDNUIsa0JBQWtCO0FBQ2xCLG9CQUFvQjtBQUNwQix1QkFBdUI7QUFDdkIsUUFBUTtBQUNSLFlBQVk7QUFDWixNQUFNO0FBRU4sTUFBTSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQzVCLFNBQVMsRUFDVCxjQUFjLENBQ2YsQ0FBQztBQUVGLGtCQUFlLE9BQU8sQ0FBQyJ9
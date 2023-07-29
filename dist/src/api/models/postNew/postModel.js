"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const postSchemal = new mongoose_1.Schema({
    title: {
        type: String,
        maxLength: [50, "A post must have less of equal then 50 characters"],
        minLength: [10, "A post must have less of less then 10 characters"],
        required: [true, "A post must have a title"],
    },
    description: {
        type: String,
        maxLength: [500, "A post must have less of equal then 500 characters"],
        minLength: [10, "A post must have less of less then 10 characters"],
        required: [true, "A post must have a description"],
    },
    images: {
        type: Array,
        required: [true, "A post must have a images"],
    },
    createAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    collection: "Post",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
postSchemal.virtual("comment", {
    ref: "Comment ",
    foreignField: "post",
    localField: "_id",
    justOne: true,
});
postSchemal.pre(/^find/, function (next) {
    this.populate({
        path: "author",
        select: "name email",
    });
    next();
});
const Post = mongoose_1.default.model("Post", postSchemal);
exports.default = Post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9tb2RlbHMvcG9zdE5ldy9wb3N0TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUE0QztBQU01QyxNQUFNLFdBQVcsR0FBRyxJQUFJLGlCQUFNLENBQzVCO0lBQ0UsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsbURBQW1ELENBQUM7UUFDcEUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLGtEQUFrRCxDQUFDO1FBQ25FLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQztLQUM3QztJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLG9EQUFvRCxDQUFDO1FBQ3RFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxrREFBa0QsQ0FBQztRQUNuRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsZ0NBQWdDLENBQUM7S0FDbkQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSwyQkFBMkIsQ0FBQztLQUM5QztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM5QjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNwQyxHQUFHLEVBQUUsTUFBTTtLQUNaO0NBQ0YsRUFDRDtJQUNFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDMUIsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtDQUM3QixDQUNGLENBQUM7QUFFRixXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtJQUM3QixHQUFHLEVBQUUsVUFBVTtJQUNmLFlBQVksRUFBRSxNQUFNO0lBQ3BCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsV0FBVyxDQUFDLEdBQUcsQ0FBTyxPQUFPLEVBQUUsVUFBVSxJQUFJO0lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxZQUFZO0tBQ3JCLENBQUMsQ0FBQztJQUNILElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLElBQUksR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBMkIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRTNFLGtCQUFlLElBQUksQ0FBQyJ9
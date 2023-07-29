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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchemal = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name!"],
    },
    address: {
        type: String,
        // required: [true, "A user must have a address!"],
    },
    phone: {
        type: Number,
        // required: [true, "A user must have a phone!"],
    },
    email: {
        type: String,
        required: [true, "A user must have a email!"],
        validate: validator_1.default.isEmail,
    },
    password: {
        type: String,
        // required: [true, "A user must have a password"],
        minLength: [10, "Your password min length 10"],
    },
    createAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    role: {
        type: String,
        default: "user",
    },
    active: {
        type: Boolean,
        default: true,
    },
    googleID: {
        type: String,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: "User",
});
// Virtual
userSchemal.virtual("cart", {
    ref: "Cart",
    foreignField: "user",
    localField: "_id",
    // justOne: true,
});
// Middleware
userSchemal.pre("save", async function (next) {
    // hash password
    // this.password = await bcrypt.hash(this.password, 12);
    next();
});
userSchemal.pre(/^find/, function (next) {
    this.find({
        active: { $ne: false },
    });
    next();
});
userSchemal.methods.comparePassword = async function (candidatePass) {
    return await bcrypt_1.default.compare(this.password, candidatePass);
};
const User = mongoose_1.default.model("User", userSchemal);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlck1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9tb2RlbHMvdXNlci91c2VyTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUE0QztBQUM1QywwREFBa0M7QUFDbEMsb0RBQTRCO0FBSzVCLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU0sQ0FDNUI7SUFDRSxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQztLQUM3QztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osbURBQW1EO0tBQ3BEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixpREFBaUQ7S0FDbEQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSwyQkFBMkIsQ0FBQztRQUM3QyxRQUFRLEVBQUUsbUJBQVMsQ0FBQyxPQUFPO0tBQzVCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixtREFBbUQ7UUFDbkQsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLDZCQUE2QixDQUFDO0tBQy9DO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQzlCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsTUFBTTtLQUNoQjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxrQkFBa0IsRUFBRSxNQUFNO0lBQzFCLG9CQUFvQixFQUFFLElBQUk7Q0FDM0IsRUFDRDtJQUNFLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDNUIsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUMxQixVQUFVLEVBQUUsTUFBTTtDQUNuQixDQUNGLENBQUM7QUFFRixVQUFVO0FBQ1YsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7SUFDMUIsR0FBRyxFQUFFLE1BQU07SUFDWCxZQUFZLEVBQUUsTUFBTTtJQUNwQixVQUFVLEVBQUUsS0FBSztJQUNqQixpQkFBaUI7Q0FDbEIsQ0FBQyxDQUFDO0FBRUgsYUFBYTtBQUNiLFdBQVcsQ0FBQyxHQUFHLENBQU8sTUFBTSxFQUFFLEtBQUssV0FBVyxJQUFJO0lBQ2hELGdCQUFnQjtJQUNoQix3REFBd0Q7SUFDeEQsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQztBQUVILFdBQVcsQ0FBQyxHQUFHLENBQU8sT0FBTyxFQUFFLFVBQVUsSUFBSTtJQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ1IsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtLQUN2QixDQUFDLENBQUM7SUFDSCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBRUgsV0FBVyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsS0FBSyxXQUN6QyxhQUFxQjtJQUVyQixPQUFPLE1BQU0sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUM7QUFFRixNQUFNLElBQUksR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBMkIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNFLGtCQUFlLElBQUksQ0FBQyJ9
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const cartModel = new mongoose_2.Schema({
    title: {
        type: String,
        required: [true, "Cart must have a title"],
    },
    price: {
        type: Number,
        required: [true, "Cart must have a price"],
    },
    quantity: {
        type: Number,
        // required: [true, "Cart must have a quantity"],
        default: 1,
    },
    address: {
        type: String,
        required: [true, "Cart must have a address"],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    pet: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "dogCat",
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "Cart",
});
// Middleware
cartModel.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "email",
    }).populate({
        path: "pet",
        select: "name",
    });
    next();
});
const Cart = mongoose_1.default.model("Cart", cartModel);
exports.default = Cart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9tb2RlbHMvY2FydC9jYXJ0TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBZ0M7QUFDaEMsdUNBQWtDO0FBS2xDLE1BQU0sU0FBUyxHQUFHLElBQUksaUJBQU0sQ0FDMUI7SUFDRSxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQztLQUMzQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDO0tBQzNDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixpREFBaUQ7UUFDakQsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDO0tBQzdDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLGtCQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQ3BDLEdBQUcsRUFBRSxNQUFNO0tBQ1o7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsa0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDcEMsR0FBRyxFQUFFLFFBQVE7S0FDZDtDQUNGLEVBQ0Q7SUFDRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzFCLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDNUIsVUFBVSxFQUFFLE1BQU07Q0FDbkIsQ0FDRixDQUFDO0FBRUYsYUFBYTtBQUNiLFNBQVMsQ0FBQyxHQUFHLENBQWdCLE9BQU8sRUFBRSxVQUFVLElBQUk7SUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNaLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLE9BQU87S0FDaEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLE1BQU07S0FDZixDQUFDLENBQUM7SUFDSCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxJQUFJLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQ3pCLE1BQU0sRUFDTixTQUFTLENBQ1YsQ0FBQztBQUVGLGtCQUFlLElBQUksQ0FBQyJ9
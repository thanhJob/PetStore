"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: [true, "A product must have a name!"],
    },
    price: {
        type: Number,
        require: [true, "A product must have a price"],
    },
    description: {
        type: String,
        maxLength: [
            1000,
            "A product must have less of equal then 1000 characters",
        ],
        minLength: [10, "A product must have less of less then 10 characters"],
    },
    images: [String],
    weigth: {
        type: String,
        require: [true, "A product must have a weigth"],
    },
    heigth: {
        type: String,
        require: [true, "A product must have a heigth"],
    },
    size: {
        type: String,
        require: [true, "A product must have a size"],
    },
    origin: {
        type: String,
        require: [true, "A product must have a origin"],
    },
    age: {
        type: String,
        require: [true, "A product must have a age"],
    },
    birth: {
        type: String,
        require: [true, "A product must have a birth"],
    },
    ratings: {
        type: Number,
        max: 5,
        min: 1,
        default: 4.5,
    },
    class: {
        type: String,
        require: [true, "A product must have a class"],
    },
    quantity: {
        type: Number,
        require: [true, "A product must have a quantity"],
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "dogCat",
});
const Product = mongoose_2.default.model("dogCat", productSchema);
exports.default = Product;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9tb2RlbHMvcHJvZHVjdC9wcm9kdWN0TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMsd0RBQWdDO0FBS2hDLE1BQU0sYUFBYSxHQUFHLElBQUksaUJBQU0sQ0FDOUI7SUFDRSxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQztLQUMvQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLDZCQUE2QixDQUFDO0tBQy9DO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUU7WUFDVCxJQUFJO1lBQ0osd0RBQXdEO1NBQ3pEO1FBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLHFEQUFxRCxDQUFDO0tBQ3ZFO0lBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2hCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLDhCQUE4QixDQUFDO0tBQ2hEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsOEJBQThCLENBQUM7S0FDaEQ7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSw0QkFBNEIsQ0FBQztLQUM5QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLDhCQUE4QixDQUFDO0tBQ2hEO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsMkJBQTJCLENBQUM7S0FDN0M7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQztLQUMvQztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLE9BQU8sRUFBRSxHQUFHO0tBQ2I7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQztLQUMvQztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLGdDQUFnQyxDQUFDO0tBQ2xEO0NBQ0YsRUFDRDtJQUNFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDMUIsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUM1QixVQUFVLEVBQUUsUUFBUTtDQUNyQixDQUNGLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FDNUIsUUFBUSxFQUNSLGFBQWEsQ0FDZCxDQUFDO0FBRUYsa0JBQWUsT0FBTyxDQUFDIn0=
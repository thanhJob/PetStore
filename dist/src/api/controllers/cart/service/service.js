"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteId = exports.updateId = exports.createNewCart = exports.getId = exports.getAll = void 0;
const cartModel_1 = __importDefault(require("../../../models/cart/cartModel"));
const productModel_1 = __importDefault(require("../../../models/product/productModel"));
async function getAll() {
    const carts = await cartModel_1.default.find();
    if (!carts)
        throw new Error("Can't get data carts. Try again later!");
    return carts;
}
exports.getAll = getAll;
async function getId(id) {
    const cart = await cartModel_1.default.findById(id).populate("cart");
    if (!cart)
        throw new Error("Can't get data cart. Try again later!");
    return cart;
}
exports.getId = getId;
async function createNewCart(req) {
    const pet = await productModel_1.default.findById(req.params.idPet);
    if (!req.body.title)
        req.body.title = pet.name;
    if (!req.body.price)
        req.body.price = pet.price;
    if (!req.body.pet)
        req.body.pet = pet._id;
    if (!req.body.user)
        req.body.user = Object.values(req.user)[5]._id;
    const newCart = await cartModel_1.default.create(req.body);
    if (!newCart)
        throw new Error("Can't create data. Try again!");
    return newCart;
}
exports.createNewCart = createNewCart;
async function updateId(id, body) {
    const cart = await cartModel_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    if (!cart)
        throw new Error("Can't update cart. Try again later!");
    return cart;
}
exports.updateId = updateId;
async function deleteId(id) {
    const cart = await cartModel_1.default.findByIdAndDelete(id);
    if (!cart)
        throw new Error("Can't delete cart. Try again later!");
    return cart;
}
exports.deleteId = deleteId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvY29udHJvbGxlcnMvY2FydC9zZXJ2aWNlL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsK0VBQWtEO0FBQ2xELHdGQUEyRDtBQUVwRCxLQUFLLFVBQVUsTUFBTTtJQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLG1CQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsSUFBSSxDQUFDLEtBQUs7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFDdEUsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBSkQsd0JBSUM7QUFFTSxLQUFLLFVBQVUsS0FBSyxDQUFDLEVBQVU7SUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsSUFBSSxDQUFDLElBQUk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDcEUsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBSkQsc0JBSUM7QUFFTSxLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQVk7SUFDOUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxzQkFBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFJLENBQUMsS0FBSyxDQUFDO0lBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFJLENBQUMsR0FBRyxDQUFDO0lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDcEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxtQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLE9BQU87UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDL0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQVRELHNDQVNDO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FBQyxFQUFVLEVBQUUsSUFBUztJQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtRQUNsRCxHQUFHLEVBQUUsSUFBSTtRQUNULGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVBELDRCQU9DO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FBQyxFQUFVO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNsRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFKRCw0QkFJQyJ9
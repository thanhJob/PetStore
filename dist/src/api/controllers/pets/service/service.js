"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteId = exports.updateId = exports.createProduct = exports.getId = exports.getAll = void 0;
const productModel_1 = __importDefault(require("../../../models/product/productModel"));
async function getAll(req) {
    // filter
    const newObj = { ...req.query };
    const removeFileds = ["sort", "limit", "page", "fields"];
    removeFileds.forEach((el) => {
        delete newObj[el];
    });
    // filter acvanced
    let queryStr = JSON.stringify(newObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = productModel_1.default.find(JSON.parse(queryStr));
    // filetr sort
    if (req.query.sort) {
        const sortBy = `${req.query.sort}`.split(",").join(" ");
        query = query.sort(sortBy);
    }
    else {
        query = query.sort("-price");
    }
    // filetr fields
    if (req.query.fields) {
        const fieldsBy = `${req.query.fields}`.split(",").join(" ");
        query = query.select(fieldsBy);
    }
    else {
        query = query.select("-__v");
    }
    // filter pagination
    if (req.query.page) {
        const page = parseInt(`${req.query.page}`) * 1 || 1;
        const limit = parseInt(`${req.query.limit}`) * 1 || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
    }
    if (!query)
        throw new Error("Can't find. Try again!");
    return query;
}
exports.getAll = getAll;
async function getId(id) {
    const product = await productModel_1.default.findById(id);
    if (!product)
        throw new Error("Can't get data product. Try again later!");
    return product;
}
exports.getId = getId;
async function createProduct(body) {
    const product = await productModel_1.default.create(body);
    if (!product)
        throw new Error("Can't create data product. Try again later!");
    return product;
}
exports.createProduct = createProduct;
async function updateId(id, body) {
    const product = await productModel_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    if (!product)
        throw new Error("Can't update product. Try again later!");
    return product;
}
exports.updateId = updateId;
async function deleteId(id) {
    const product = await productModel_1.default.findByIdAndDelete(id);
    if (!product)
        throw new Error("Can't delete product. Try again later!");
    return product;
}
exports.deleteId = deleteId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvY29udHJvbGxlcnMvcGV0cy9zZXJ2aWNlL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esd0ZBQTJEO0FBRXBELEtBQUssVUFBVSxNQUFNLENBQUMsR0FBWTtJQUN2QyxTQUFTO0lBQ1QsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxNQUFNLFlBQVksR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUMxQixPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILGtCQUFrQjtJQUNsQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDNUUsSUFBSSxLQUFLLEdBQUcsc0JBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRS9DLGNBQWM7SUFDZCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1FBQ2xCLE1BQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tB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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.activeUser = exports.deleteId = exports.updateId = exports.create = exports.getId = exports.getAll = void 0;
const userModel_1 = __importDefault(require("../../../models/user/userModel"));
async function getAll() {
    const users = await userModel_1.default.find();
    if (!users)
        throw new Error("Can't get data user. Try again later!");
    return users;
}
exports.getAll = getAll;
async function getId(id) {
    const user = await userModel_1.default.findById(id).populate("cart");
    if (!user)
        throw new Error("Can't get data user. Try again later!");
    return user;
}
exports.getId = getId;
async function create(body) {
    const user = await userModel_1.default.create(body);
    if (!user)
        throw new Error("Can't create data user. Try again later!");
    return user;
}
exports.create = create;
async function updateId(id, body) {
    const user = await userModel_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    if (!user)
        throw new Error("Can't update user. Try again later!");
    return user;
}
exports.updateId = updateId;
async function deleteId(id) {
    const user = await userModel_1.default.findByIdAndDelete(id);
    if (!user)
        throw new Error("Can't delete user. Try again later!");
    return user;
}
exports.deleteId = deleteId;
async function activeUser(req) {
    const user = await userModel_1.default.findByIdAndUpdate(Object.values(req.user)[5]._id, { active: false }, {
        new: true,
        runValidators: true,
    });
    if (!user)
        throw new Error("Can't update data user. Try again later!");
    return user;
}
exports.activeUser = activeUser;
async function updateProfile(req) {
    // Update fields
    const filterObj = (obj, ...allWebFields) => {
        const newObj = {};
        Object.keys(obj).forEach((el) => {
            if (allWebFields.includes(el)) {
                newObj[el] = obj[el];
            }
        });
        return newObj;
    };
    if (req.body.password)
        throw new Error("This router is not for passwords update. Pls use /updateMyPassword!");
    if (req.body.role)
        throw new Error("You does not permission update role!");
    const filterKeys = filterObj(req.body, "name", "address", "phone");
    const currentUser = await userModel_1.default.findByIdAndUpdate(Object.values(req.user)[5]._id, filterKeys, {
        new: true,
        runValidators: true,
    });
    // const currentUser = await User.findById(Object.values(req.user!)[5]._id);
    if (!currentUser)
        throw new Error("Can't update user. Try again later!");
    return currentUser;
}
exports.updateProfile = updateProfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvY29udHJvbGxlcnMvdXNlci9zZXJ2aWNlL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsK0VBQWtEO0FBRTNDLEtBQUssVUFBVSxNQUFNO0lBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sbUJBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUMsS0FBSztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUNyRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFKRCx3QkFJQztBQUVNLEtBQUssVUFBVSxLQUFLLENBQUMsRUFBVTtJQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUNwRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFKRCxzQkFJQztBQUVNLEtBQUssVUFBVSxNQUFNLENBQUMsSUFBUztJQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUpELHdCQUlDO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FBQyxFQUFVLEVBQUUsSUFBUztJQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtRQUNsRCxHQUFHLEVBQUUsSUFBSTtRQUNULGFB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
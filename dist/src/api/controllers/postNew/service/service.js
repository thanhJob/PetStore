"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteId = exports.updateId = exports.createNewPost = exports.getId = exports.getAll = void 0;
const postModel_1 = __importDefault(require("../../../models/postNew/postModel"));
async function getAll() {
    const posts = await postModel_1.default.find();
    if (!posts)
        throw new Error("Can't get data posts. Try again later!");
    return posts;
}
exports.getAll = getAll;
async function getId(id) {
    const post = await postModel_1.default.findById(id).populate({
        path: "comment",
        select: "description",
        model: Comment,
    });
    if (!post)
        throw new Error("Can't get data post. Try again later!");
    return post;
}
exports.getId = getId;
async function createNewPost(req) {
    if (!req.body.author)
        req.body.author = Object.values(req.user)[5]._id;
    const newPost = await postModel_1.default.create(req.body);
    if (!newPost)
        throw new Error("Can't create new data. Try again later!");
    return newPost;
}
exports.createNewPost = createNewPost;
async function updateId(id, body) {
    const post = await postModel_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    if (!post)
        throw new Error("Can't update post. Try again later!");
    return post;
}
exports.updateId = updateId;
async function deleteId(id) {
    const post = await postModel_1.default.findByIdAndDelete(id);
    if (!post)
        throw new Error("Can't delete post. Try again later!");
    return post;
}
exports.deleteId = deleteId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvY29udHJvbGxlcnMvcG9zdE5ldy9zZXJ2aWNlL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esa0ZBQXFEO0FBRTlDLEtBQUssVUFBVSxNQUFNO0lBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sbUJBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUMsS0FBSztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN0RSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFKRCx3QkFJQztBQUVNLEtBQUssVUFBVSxLQUFLLENBQUMsRUFBVTtJQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUM1QyxJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLEtBQUssRUFBRSxPQUFPO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDcEUsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBUkQsc0JBUUM7QUFFTSxLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQVk7SUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN4RSxNQUFNLE9BQU8sR0FBRyxNQUFNLG1CQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsT0FBTztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztJQUN6RSxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBTEQsc0NBS0M7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUFDLEVBQVUsRUFBRSxJQUFTO0lBQ2xELE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFO1FBQ2xELEdBQUcsRUFBRSxJQUFJO1FBQ1QsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDbEUsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBUEQsNEJBT0M7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUFDLEVBQVU7SUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxtQkFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUpELDRCQUlDIn0=
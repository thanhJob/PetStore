"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteId = exports.updateId = exports.createNewComment = exports.getId = exports.getAll = void 0;
const cmtModel_1 = __importDefault(require("../../../models/comment/cmtModel"));
async function getAll() {
    const comments = await cmtModel_1.default.find();
    if (!comments)
        throw new Error("Can't get data comments. Try again later!");
    return comments;
}
exports.getAll = getAll;
async function getId(id) {
    const post = await cmtModel_1.default.findById(id).populate({
        path: "comment",
        select: "description",
        model: cmtModel_1.default,
    });
    if (!post)
        throw new Error("Can't get data post. Try again later!");
    return post;
}
exports.getId = getId;
async function createNewComment(req) {
    if (!req.body.post)
        req.body.post = req.params.idPost;
    if (!req.body.author)
        req.body.author = Object.values(req.user)[5]._id;
    const newComment = await cmtModel_1.default.create(req.body);
    if (!newComment)
        throw new Error("Can't create comment. Try again later!");
    return newComment;
}
exports.createNewComment = createNewComment;
async function updateId(id, body) {
    const comment = await cmtModel_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    if (!comment)
        throw new Error("Can't update comment. Try again later!");
    return comment;
}
exports.updateId = updateId;
async function deleteId(id) {
    const comment = await cmtModel_1.default.findByIdAndDelete(id);
    if (!comment)
        throw new Error("Can't delete comment. Try again later!");
    return comment;
}
exports.deleteId = deleteId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvY29udHJvbGxlcnMvY29tbWVudC9zZXJ2aWNlL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsZ0ZBQXVEO0FBR2hELEtBQUssVUFBVSxNQUFNO0lBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sa0JBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxJQUFJLENBQUMsUUFBUTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUM1RSxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBSkQsd0JBSUM7QUFFTSxLQUFLLFVBQVUsS0FBSyxDQUFDLEVBQVU7SUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxrQkFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDL0MsSUFBSSxFQUFFLFNBQVM7UUFDZixNQUFNLEVBQUUsYUFBYTtRQUNyQixLQUFLLEVBQUUsa0JBQU87S0FDZixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUNwRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFSRCxzQkFRQztBQUVNLEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxHQUFZO0lBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3hFLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0JBQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxVQUFVO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBQzNFLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFORCw0Q0FNQztBQUVNLEtBQUssVUFBVSxRQUFRLENBQUMsRUFBVSxFQUFFLElBQVM7SUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7UUFDeEQsR0FBRyxFQUFFLElBQUk7UUFDVCxhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsT0FBTztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN4RSxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBUEQsNEJBT0M7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUFDLEVBQVU7SUFDdkMsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELElBQUksQ0FBQyxPQUFPO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFKRCw0QkFJQyJ9
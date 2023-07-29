"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComment = exports.createComment = exports.getComments = void 0;
const service_1 = require("../service/service");
async function getComments(req, res, next) {
    try {
        const comments = await (0, service_1.getAll)();
        res.status(200).json({
            status: "Successful!",
            data: comments,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getComments = getComments;
async function createComment(req, res, next) {
    try {
        const newComment = await (0, service_1.createNewComment)(req);
        res.status(201).json({
            status: "Successful!",
            data: newComment,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.createComment = createComment;
async function getComment(req, res, next) {
    try {
        const id = req.params.id;
        const comment = await (0, service_1.getId)(id);
        res.status(200).json({
            status: "Successful!",
            data: comment,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getComment = getComment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NvbnRyb2xsZXJzL2NvbW1lbnQvY29udHJvbGxlci9jb21tZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxnREFBK0U7QUFFeEUsS0FBSyxVQUFVLFdBQVcsQ0FDL0IsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLGdCQUFNLEdBQUUsQ0FBQztRQUVoQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWZELGtDQWVDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FDakMsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLDBCQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWZELHNDQWVDO0FBRU0sS0FBSyxVQUFVLFVBQVUsQ0FDOUIsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFBLGVBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJLEVBQUUsT0FBTztTQUNkLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWZELGdDQWVDIn0=
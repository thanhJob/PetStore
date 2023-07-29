"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const service_1 = require("../service/service");
async function getPosts(req, res, next) {
    try {
        const posts = await (0, service_1.getAll)();
        res.status(200).json({
            status: "Successfully!",
            length: posts.length,
            data: posts,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getPosts = getPosts;
async function createPost(req, res, next) {
    try {
        const newPost = await (0, service_1.createNewPost)(req);
        res.status(201).json({
            status: "Successfully!",
            data: newPost,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.createPost = createPost;
async function getPost(req, res, next) {
    try {
        const id = req.params.id;
        const post = await (0, service_1.getId)(id);
        res.status(200).json({
            status: "Successfully!",
            data: post,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getPost = getPost;
async function updatePost(req, res, next) {
    try {
        const id = req.params.id;
        const post = await (0, service_1.updateId)(id, req.body);
        res.status(203).json({
            status: "Successfully!",
            data: post,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.updatePost = updatePost;
async function deletePost(req, res, next) {
    try {
        const id = req.params.id;
        const post = await (0, service_1.deleteId)(id);
        res.status(204).json({
            status: "Successfully!",
            data: null,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.deletePost = deletePost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NvbnRyb2xsZXJzL3Bvc3ROZXcvY29udHJvbGxlci9wb3N0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFRQSxnREFNNEI7QUFFckIsS0FBSyxVQUFVLFFBQVEsQ0FDNUIsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLGdCQUFNLEdBQUUsQ0FBQztRQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsZUFBZTtZQUN2QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsSUFBSSxFQUFFLEtBQUs7U0FDWixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFmRCw0QkFlQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQzlCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0I7SUFFbEIsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSx1QkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBZkQsZ0NBZUM7QUFFTSxLQUFLLFVBQVUsT0FBTyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFDM0UsSUFBSTtRQUNGLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxlQUFLLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFFN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFaRCwwQkFZQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQzlCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0I7SUFFbEIsSUFBSTtRQUNGLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxrQkFBUSxFQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFmRCxnQ0FlQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQzlCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0I7SUFFbEIsSUFBSTtRQUNGLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxrQkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBaEJELGdDQWdCQyJ9